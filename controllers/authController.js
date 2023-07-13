const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');

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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json(info);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Logged in successfully.' });
    });
  })(req, res, next);
};

// Add other auth-related functions (signup, logout) here

//

exports.passport = passport;

