import * as _ from 'lodash';
var stripe = require("stripe")("sk_test_v6lCFZX5WN7GxxVFAjKzDUyg");

const toursContext = require.context('../content/tours/', false, /\.json$/);
const tours = toursContext.keys().map(key => ({
  ...toursContext(key),
  showBooking: false,
  _path: `/tours/${key.replace('.json', '').replace('./', '')}`
}));

exports.handler = async (event, context, callback) => {
  const req = JSON.parse(event.body);
  // const tour = _.find(tours, ['rezid', req.id]);

  const charge = await stripe.charges.create({
    amount: req.amount,
    currency: 'usd',
    description: 'Example charge',
    source: req.token,
  });

  callback(null, {
    statusCode: 200,
    body: 'success'
  });
}