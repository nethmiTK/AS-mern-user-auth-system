const User = require('../models/User');

exports.updateUser = async (req, res) => {
  try {
    const { fullName, username, email } = req.body;
    const userId = req.user.id;

    let updateData = { fullName, username, email };

    if (req.file) {
      updateData.profilePic = req.file.path;  // Save path to DB
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    res.json({ message: 'Profile updated successfully!', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed.' });
  }
};
