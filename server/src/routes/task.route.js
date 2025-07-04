const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/task.controller');

// These are correct and should match frontend
router.get('/boards/:id/task', getTasks);
router.post('/boards/:id/task', createTask);
router.put('/task/:taskId', updateTask);
router.delete('/task/:taskId', deleteTask);

module.exports = router;
