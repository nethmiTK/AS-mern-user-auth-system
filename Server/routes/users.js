const express = require('express');
const router = express.Router();
const { updateUser } = require('../controllers/users.controller');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');  // your token verify middleware

router.put('/update', auth, upload.single('profilePic'), updateUser);

module.exports = router;
