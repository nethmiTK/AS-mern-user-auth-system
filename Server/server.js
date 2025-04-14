const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');        // Your login/register routes
const userRoutes = require('./routes/userRoutes');   // New user profile routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

mongoose
  .connect('mongodb://localhost:27017/user-mern-dashboard', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((error) => console.error('❌ MongoDB connection failed:', error));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
