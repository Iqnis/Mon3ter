const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference the User model to track which user the attendance belongs to
  },
  clockInTime: {
    type: Date,
    required: true, // Ensure this is always present (since every attendance starts with a clock-in)
  },
  clockOutTime: {
    type: Date, // Not required because a user might not have clocked out yet
  },
  status: {
    type: String,
    required: true, // Track whether they were 'Present', 'Absent', etc.
  },
});

// Export the Mongoose model
module.exports = mongoose.model('Attendance', attendanceSchema);


