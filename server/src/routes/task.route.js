const express = require('express');
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/task.controller');

// GET all tasks for a board
router.get('/boards/:id/task', getTasks);

// POST a new task under a board
router.post('/boards/:id/task', createTask);

// PUT update a task
router.put('/task/:taskId', updateTask);

// DELETE a task
router.delete('/task/:taskId', deleteTask);

module.exports = router;

