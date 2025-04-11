const express = require('express');
const bcrypt = require('bcryptjs'); // Using bcryptjs for hashing (you can switch to bcrypt if needed)
const User = require('../models/User');

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    console.log('Received registration data:', req.body); // Log received data for debugging

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword); // Log hashed password for debugging

    // Create and save new user
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log('New user created:', newUser); // Log created user for debugging

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

module.exports = router;
