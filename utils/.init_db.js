// IMPORTANT: Only run this once!
//
require('dotenv').config()
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

async function createUser() {
  try {
    const newUser = new User({
      username: 'alice',
      password: 'letmein'
    });

    await newUser.save();

    console.log('Initial user saved successfully');
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
}

createUser();

