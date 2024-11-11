const mongoose = require('mongoose');
const User = require('./models/User'); // Ensure the path is correct
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Clear existing test users
    await User.deleteMany({ username: { $in: ['admin', 'staff'] } });

    // Add test users with all required fields
    await User.create({
      username: 'admin',
      password: 'adminpass',
      email: 'admin@example.com',
      phoneNumber: '1234567890',
      address: '123 Admin St'
    });
    await User.create({
      username: 'staff',
      password: 'staffpass',
      email: 'staff@example.com',
      phoneNumber: '0987654321',
      address: '456 Staff Ave'
    });

    console.log('Test users created');
    mongoose.disconnect();
  })
  .catch(err => console.error('MongoDB connection error:', err));

