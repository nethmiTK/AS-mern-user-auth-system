const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');

// GET current user profile
router.get('/profile', authenticate, (req, res) => {
  res.json(req.user);
});

// UPDATE current user profile
router.put('/update', authenticate, async (req, res) => {
  try {
    const { fullName, username, email } = req.body;
    // Update only the fields that are passed in.
    if (fullName) req.user.fullName = fullName;
    if (username) req.user.username = username;
    if (email) req.user.email = email;
    await req.user.save();
    res.json({ message: 'Profile updated successfully', user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Profile update failed' });
  }
});

module.exports = router;
