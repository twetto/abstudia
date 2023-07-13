const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register
router.post('/register', async (req, res) => {
  // Handle user registration here
});

// Login
router.post('/login', authController.login);

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out' });
});

module.exports = router;

