const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const order = await Order.create({
    user: req.user.id,
    ...req.body,
    isPaid: false,
  });
  res.json(order);
});
module.exports = router;
