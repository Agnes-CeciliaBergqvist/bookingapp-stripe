// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.




//Backend to create diffrent API endpoints. This i the provider 
const express = require('express'); 
const bodyParser = require('body-parser')
const app = express();
const cors = require("cors"); 

//Här ligger vår secret key 
const stripe = require('stripe')('sk_test_51Ix6LSGaMeFrhWKCJXLvA6lmC7PAT51kEWD1UVzwtIopHIsfFnVIjZy989HYCmLKg60QS2Ynr8Yxlmj6QMPkJECG00ucXz7OCN')

app.use(cors())

//This is to be able do read the body of name and price. 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/create-checkout-session', async (req, res) => {

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
        
      {
        price_data: {
          currency: 'SEK',
          product_data: {
            name: req.body.name,
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
     success_url: 'https://heuristic-archimedes-2e4bb9.netlify.app/success',
     cancel_url: 'https://heuristic-archimedes-2e4bb9.netlify.app/cancel.html',
  });
//Id här får vi från vår backend 
  res.json({ id: session.id });
});

const port = process.env.PORT || 3000
app.listen(port);
//Vi har port 3000 
//ska se om detta funkar 