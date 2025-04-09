const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      fullName,
      username,
      email,
      password,
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      user: { id: user._id, fullName: user.fullName, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      user: { id: user._id, fullName: user.fullName, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser };
