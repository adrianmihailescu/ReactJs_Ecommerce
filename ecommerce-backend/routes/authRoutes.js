const express = require('express');
const router = express.Router();
const { registerUser, loginUser, checkState } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/checkstate', checkState);

module.exports = router;
