// const express = require("express");
// const router = express.Router();
// const Stripe = require("stripe");
// const stripe = Stripe("sk_test_..."); // 🔐 Use your real secret key here

// router.post("/", async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // cents
//       currency: "lkr", // or "usd"
//       automatic_payment_methods: { enabled: true },
//     });

//     res.send({ clientSecret: paymentIntent.client_secret });
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// module.exports = router;

// routes/createPaymentIntent.js

// hospital-be/routes/createPaymentIntent.js
const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_YOUR_SECRET_KEY");

router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;


