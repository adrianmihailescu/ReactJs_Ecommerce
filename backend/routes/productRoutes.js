const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/save', async (req, res) => {
  console.log('Received product:', req.body);

  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error saving product:', err.message, err.stack);
    res.status(500).json({ message: 'Error saving product' });
  }
});

module.exports = router;
