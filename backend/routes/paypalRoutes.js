const express = require("express");
const router = express.Router();

router.get("/client-id", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
  console.log(`Client ID sent to the client. Client ID: ${process.env.PAYPAL_CLIENT_ID}`);
});

module.exports = router;
