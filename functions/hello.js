const stripe = require("stripe")("sk_test_v6lCFZX5WN7GxxVFAjKzDUyg");
const SNS = require('aws-sdk/clients/sns');
const AWS = require('aws-sdk/global');
AWS.config.update({
  accessKeyId: 'AKIAIHVWRUGOJULIFBEQ',
  secretAccessKey: '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',
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
  // const tour = tours.find((tour) => tour.rezid === req.id);
  // console.log(tour);

  try {
    const charge = await stripe.charges.create({
      amount: req.amount,
      currency: 'usd',
      description: 'Example charge',
      source: req.token,
    });

    const snsParams = {
      MessageStructure: 'json',
      Message: JSON.stringify({
        default: JSON.stringify({
          tour: req.tour.title,
          guests: req.totalGuests,
          amount: req.amount,
          name: req.guest.name,
          email: req.guest.email,
          phone: req.guest.phone
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
    return {
      statusCode: 400,
      body: err.message
    };
  }
}