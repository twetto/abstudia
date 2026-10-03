const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');

// 10 failed login attempts per IP per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  message: { message: 'Too many login attempts, try again later.' }
});

// Register
router.post('/register', async (req, res) => {
  // Handle user registration here
});

// Login
router.post('/login', loginLimiter, authController.login);

// Logout
router.get('/logout', authController.logout);

// Current session's user
router.get('/me', authController.ensureAuthenticated, authController.me);

module.exports = router;

