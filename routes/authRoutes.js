const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }).then(user => {
    if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
    bcrypt.compare(password, user.password, function(err, res) {
      if (err) { return done(err); }
      if (res === false) { return done(null, false, { message: 'Incorrect password.' }); }
      return done(null, user);
    });
  }).catch(err => { return done(err); });
}));

// Register
router.post('/register', async (req, res) => {
  // Handle user registration here
});

// Login
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); } // handle server errors
    if (!user) { return res.status(400).json({ message: 'Incorrect username or password.' }); } // handle incorrect credentials
    //req.logIn(user, function(err) { 
    //  if (err) { return next(err); } // handle server errors
    //  return res.json({ message: 'Logged in successfully.' }); // send success message if everything went well
    //});
    return res.json({ message: 'Logged in successfully.' });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out' });
});

module.exports = router;

