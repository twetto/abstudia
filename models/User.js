const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Add any additional fields as needed.
});

// This runs before saving a user
UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hash = await bcrypt.hash(user.password, salt); // Hash the password with the salt
    user.password = hash; // Replace the plain text password with the hash
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);

