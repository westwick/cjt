if (!process.env.CJT_ENV) {
  require('dotenv').config()
}

const stripe = require("stripe")(process.env.CJT_STRIPE_SECRET_KEY);
const SNS = require('aws-sdk/clients/sns');
const AWS = require('aws-sdk/global');
AWS.config.update({
  accessKeyId: process.env.CJT_AWS_KEY_ID,
  secretAccessKey: process.env.CJT_AWS_SECRET_KEY,
  region: 'us-west-2'
});

const toursContext = require.context('../content/tours/', false, /\.json$/);
const tours = toursContext.keys().map(key => ({
  ...toursContext(key),
  showBooking: false,
  _path: `/tours/${key.replace('.json', '').replace('./', '')}`
}));

function validateAndParseInput(req) {
  if (!req.tourId || !req.amount || !req.token || !req.tickets || !req.date || !req.time) {
    throw new Error('missing required tour information');
  }

  if (!req.guest || !req.guest.name || !req.guest.email || !req.guest.phone) {
    throw new Error('missing required guest information');
  }

  const tour = tours.find((tour) => tour.tourId === req.tourId);

  if (!tour || !tour.booking || !tour.booking.tickets) {
    throw new Error('tour not found or missing tickets');
  }
  
  const tickets = [];
  for (const ticket of req.tickets) {
    const foundTicket = tour.booking.tickets.find(t => t.label === ticket.label && t.price === ticket.price);
    if (!foundTicket) {
      console.log(ticket, tour.booking.tickets);
      throw new Error('no matching ticket found')
    }
    tickets.push({
      label: foundTicket.label,
      description: foundTicket.description,
      price: foundTicket.price,
      qty: ticket.qty
    });
  }

  if (tickets.length < 1) {
    throw new Error('tickets qty was 0');
  }

  const itemsForEmail = tickets.map(ticket => ({
    text: `${ticket.qty} ${(ticket.qty > 1 ? 'Guests' : 'Guest')} @ $${(ticket.price/100).toFixed(2)}`,
    description: ticket.label + (ticket.description ? ` (${ticket.description})`:''),
    price: '$ ' + ((ticket.price * ticket.qty)/100).toFixed(2)
  }));
  const totalGuests = tickets.reduce((guests, ticket) => guests + ticket.qty, 0);
  const subtotal = tickets.reduce((t, ticket) => t + (ticket.qty * ticket.price), 0);
  const total = subtotal + Math.round(subtotal * 0.115, 2);
  const bookingFee = (Math.round(subtotal * 0.115, 2)/100).toFixed(2);
  itemsForEmail.push({
    text: 'Booking fee',
    price: '$ ' + bookingFee
  });

  if (!totalGuests || totalGuests < 1) {
    throw new Error('total guests missing');
  }

  if (!itemsForEmail || itemsForEmail < 2 || !subtotal || subtotal < 1) {
    throw new Error('tickets or subtotal was 0');
  }

  if (total !== req.amount) {
    throw new Error('reqested total did not match calculated total')
  }

  return { tour, itemsForEmail, totalGuests, total };
}

exports.handler = async (event, context) => {
  const req = JSON.parse(event.body);

  try {

    const { tour, itemsForEmail, totalGuests, total } = validateAndParseInput(req);

    const charge = await stripe.charges.create({
      amount: total,
      currency: 'usd',
      description: tour.title,
      source: req.token,
    });

    const snsParams = {
      MessageStructure: 'json',
      Message: JSON.stringify({
        default: JSON.stringify({
          tourId: tour.tourId,
          tourName: tour.title,
          items: itemsForEmail,
          total: '$ ' + (total/100).toFixed(2),
          tourIncludesPickup: !!tour.booking.includesPickup,
          tourDate: req.date,
          tourTime: tour.booking.email.startTime ? tour.booking.email.startTime : req.time,
          tourDescription: tour.booking.email.description,
          tourDescription2: tour.booking.email.description2,
          tourGratuity: tour.booking.email.gratuity,
          tourPrivate: tour.booking.email.private,
          tourBoatlaunchDirections: tour.booking.email.boatlaunchDirections,
          tourStableDirections: tour.booking.email.stableDirections,
          tourImage: tour.thumbnail + '-/scale_crop/220x136/',
          totalGuests: totalGuests,
          guestName: req.guest.name,
          guestEmail: req.guest.email,
          guestPhone: req.guest.phone,
          guestPickup: tour.booking.includesPickup && !req.guest.pickup ? '(Please let us know)' : req.guest.pickup
        })
      }),
      TopicArn: 'arn:aws:sns:us-west-2:633019810821:orders'
    };
    
    const data = await new SNS({apiVersion: '2010-03-31'}).publish(snsParams).promise();

    return {
      statusCode: 200,
      body: 'success'
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: err.message
    };
  }
}