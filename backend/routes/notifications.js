const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice'); 
const authMiddleware = require('../middleware/auth');

// GET: Fetch notices for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // Adjust based on how user ID is stored in req.user
    const notices = await Notice.find({ recipientId: userId }).sort({ issuedAt: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notices', error });
  }
});

// PATCH: Mark a notice as read
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    if (notice.recipientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    notice.read = true;
    await notice.save();
    res.status(200).json({ message: 'Notice marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notice', error });
  }
});

module.exports = router;

