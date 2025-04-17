const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  email: String,
  password: String,
  profilePic: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('User', userSchema);
