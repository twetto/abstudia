require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const taskRouter = require('./routes/taskRoutes');
const authRouter = require('./routes/authRoutes');
const authController = require('./controllers/authController');

const app = express();
app.set('trust proxy', 'loopback');  // nginx on the same host
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());  // for parsing application/json

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI 
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}));

app.use(authController.passport.initialize());
app.use(authController.passport.session());

app.use('/auth', authRouter);
app.use('/tasks', taskRouter);

// Serve the built web client (client/dist) from the same origin as the API
const clientDir = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientDir));

// Global error handler: async route errors land here instead of crashing
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Bind to loopback only: nginx is the sole public entry point (HTTPS)
app.listen(port, '127.0.0.1', () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;

