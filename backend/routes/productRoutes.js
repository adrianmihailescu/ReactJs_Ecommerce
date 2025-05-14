const express = require("express");
const Product = require("../models/Product");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/", protect, async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

module.exports = router;
