const express = require('express');
const router = express.Router();
const { registerUser, loginUser, checkState } = require('../controllers/authController');
const bcrypt = require('bcryptjs');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
