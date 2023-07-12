require('dotenv').config()
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function fetchUsers() {
  try {
    const users = await User.find();
    console.log(users);
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
}

fetchUsers();

