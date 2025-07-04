const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/task.controller');

// These are now relative to /boards
router.get('/:id/task', getTasks);
router.post('/:id/task', createTask);
router.put('/task/:taskId', updateTask);
router.delete('/task/:taskId', deleteTask);

module.exports = router;
