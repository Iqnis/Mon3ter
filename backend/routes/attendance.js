const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance'); // Import the Attendance model
const authMiddleware = require('../middleware/auth'); // Middleware to authenticate users

// POST: Clock-in (register attendance)
router.post('/register', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.user.id; // Use authenticated userId

    const newAttendance = new Attendance({
      userId,
      clockInTime: new Date(), // Register the current time as clock-in time
      status,
    });

    await newAttendance.save();
    res.status(200).json({ message: 'Attendance registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering attendance', error });
  }
});

// POST: Clock-out (update attendance)
router.post('/clockout', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the latest attendance record for this user where clockOutTime is still null
    const attendance = await Attendance.findOne({ userId, clockOutTime: null }).sort({ clockInTime: -1 });

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    attendance.clockOutTime = new Date(); // Set current time as clock-out time
    await attendance.save();

    res.status(200).json({ message: 'Clock-out recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error recording clock-out', error });
  }
});

// GET: Fetch attendance data for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const attendanceRecords = await Attendance.find({ userId });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance records', error });
  }
});

module.exports = router;





