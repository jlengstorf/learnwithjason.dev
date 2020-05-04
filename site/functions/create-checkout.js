const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const validateCartItems = require('use-shopping-cart/src/serverUtil')
  .validateCartItems;

const inventory = require('./data/products.json');

exports.handler = async (event) => {
  try {
    const productJSON = JSON.parse(event.body);
    const line_items = validateCartItems(inventory, productJSON);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      /*
       * This env var is set by Netlify and inserts the live site URL. If you want
       * to use a different URL, you can hard-code it here or check out the
       * other environment variables Netlify exposes:
       * https://docs.netlify.com/configure-builds/environment-variables/
       */
      success_url: `${process.env.URL}/success.html`,
      cancel_url: process.env.URL,
      line_items: [
        ...line_items,
        {
          name: 'Shipping and Handling',
          description: 'Flat rate shipping anywhere in the world.',
          images: [],
          amount: 350,
          currency: 'USD',
          quantity: 1,
        },
      ],
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    console.error(error);
  }
};
