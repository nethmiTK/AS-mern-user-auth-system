const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');

// For demonstration, we use an in‑memory store.
// Let’s assume the logged in user "hashini" already exists.
let userData = {
  fullName: "Ghashini",
  username: "hashini",
  email: "hashini@example.com"
};

// GET user profile
router.get('/profile', authenticate, (req, res) => {
  // In a real project, look up the user using req.user.id
  res.json(userData);
});

// PUT update profile
router.put('/update', authenticate, (req, res) => {
  const { fullName, username, email } = req.body;
  if (fullName && username && email) {
    userData = { fullName, username, email };
    res.json({ message: 'Profile updated successfully', user: userData });
  } else {
    res.status(400).json({ message: 'Invalid data provided' });
  }
});

module.exports = router;