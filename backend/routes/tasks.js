// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

// GET: Fetch tasks for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ assignedTo: userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

// PATCH: Update task status
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Ensure the task is assigned to the logged-in user
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    task.status = status;
    await task.save();
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

module.exports = router;


