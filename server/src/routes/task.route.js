const express = require('express');
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/task.controller');

// GET all tasks for a board
router.get('/:boardId', getTasks);         // GET /api/tasks/:boardId

// POST a new task under a board
router.post('/:boardId', createTask);      // POST /api/tasks/:boardId

// PUT update a task
router.put('/:taskId', updateTask);        // PUT /api/tasks/:taskId

// DELETE a task
router.delete('/:taskId', deleteTask);     // DELETE /api/tasks/:taskId

module.exports = router;
