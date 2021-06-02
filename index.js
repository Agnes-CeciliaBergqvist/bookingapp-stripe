// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.




//Backend to create diffrent API endpoints. This i the provider 

const express = require('express'); 
const app = express();
const cors = require("cors"); 

//Här ligger vår secret key 
const stripe = require('stripe')('sk_test_51Ix6LSGaMeFrhWKCJXLvA6lmC7PAT51kEWD1UVzwtIopHIsfFnVIjZy989HYCmLKg60QS2Ynr8Yxlmj6QMPkJECG00ucXz7OCN')

app.use(cors())

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
        //denna datan nedan ska bli dynamisk 
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
     success_url: 'https://heuristic-archimedes-2e4bb9.netlify.app/success.html',
     cancel_url: 'https://heuristic-archimedes-2e4bb9.netlify.app/cancel.html',
  });
//Id här får vi från vår backend 
  res.json({ id: session.id });
});

const port = process.env.PORT || 3000
app.listen(port);
//localhost:4242
//ska se om detta funkar 