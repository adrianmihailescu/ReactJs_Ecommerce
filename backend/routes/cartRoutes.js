const express = require('express');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');
const router = express.Router();

// POST /cart/add
router.post('/add', protect, async (req, res) => {
  console.log('Adding item to cart:', req.body);
  const { product } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  const existingItem = cart.items.find(item => item.product.toString() === product._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ product: product._id, name: product.name, price: product.price, quantity: 1 });
  }

  await cart.save();
  res.json({ cart: cart.items });
});

// POST /cart/remove
router.post('/remove', protect, async (req, res) => {
    console.log('Removing item from cart:', req.body);
  const { productId } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart)
    return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(item => item.product !== productId);
  await cart.save();

  res.json({ cart: cart.items });
});

// GET /cart
router.get('/', protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  res.json({ cart: cart?.items || [] });
});

module.exports = router;
