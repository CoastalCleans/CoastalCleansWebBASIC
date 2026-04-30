const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let amount;
  try {
    const body = JSON.parse(event.body);
    amount = parseInt(body.amount, 10);
    if (!amount || amount < 1) throw new Error('Invalid amount');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const origin = event.headers.origin || process.env.SITE_URL || 'https://coastalcleans.org';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      submit_type: 'donate',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'CoastalCleans Donation',
            description: 'Funding beach cleanups and education in Tampa Bay.',
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      success_url: `${origin}/donate.html?success=true`,
      cancel_url: `${origin}/donate.html`,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
