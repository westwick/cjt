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

exports.handler = async (event, context) => {
  const req = JSON.parse(event.body);
  
  // TODO: validate!!

  try {
    const tour = tours.find((tour) => tour.tourId === req.tourId);

    const charge = await stripe.charges.create({
      amount: req.amount,
      currency: 'usd',
      description: 'Example charge',
      source: req.token,
    });

    const tickets = req.tickets.map(ticket => ({
      text: `${ticket.qty} ${(ticket.qty > 1 ? 'Guests' : 'Guest')} @ $${(ticket.price/100).toFixed(2)}`,
      description: ticket.label + (ticket.description ? ` (${ticket.description})`:''),
      price: '$ ' + ((ticket.price * ticket.qty)/100).toFixed(2)
    }));
    const totalGuests = req.tickets.reduce((guests, ticket) => guests + ticket.qty, 0);
    console.log(totalGuests);
    const subtotal = req.tickets.reduce((t, ticket) => t + (ticket.qty * ticket.price), 0);
    console.log(subtotal);
    const bookingFee = (Math.round(subtotal * 0.115, 2)/100).toFixed(2);
    tickets.push({
      text: 'Booking fee',
      price: '$ ' + bookingFee
    });

    const snsParams = {
      MessageStructure: 'json',
      Message: JSON.stringify({
        default: JSON.stringify({
          tourId: tour.tourId,
          tourName: tour.title,
          items: tickets,
          total: '$ ' + (req.amount/100).toFixed(2),
          tourIncludesPickup: !!tour.booking.includesPickup,
          tourDate: req.date,
          tourTime: tour.booking.email.startTime ? tour.booking.email.startTime : req.time,
          tourDescription: tour.booking.email.description,
          tourDescription2: tour.booking.email.description2,
          tourGratuity: tour.booking.email.gratuity,
          tourPrivate: tour.booking.email.private,
          tourDirections: tour.booking.email.directions,
          tourImage: tour.thumbnail + '-/scale_crop/220x136/',
          totalGuests: totalGuests,
          guestName: req.guest.name,
          guestEmail: req.guest.email,
          guestPhone: req.guest.phone,
          guestPickup: req.guest.pickup
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