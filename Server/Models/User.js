const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pp:{ type: String, default: 'https://i.imgur.com/4e0j5xk.png' }, // Default profile picture URL
});

module.exports = mongoose.model('User', UserSchema);
