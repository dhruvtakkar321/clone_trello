const express = require('express');
const router = express.Router();

const {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard
} = require('../controllers/board.controller');

// Create a new board
router.post('/', createBoard);

// Get all boards
router.get('/', getBoards);

// Update board name by ID
router.put('/:id', updateBoard);

// Delete a board by ID
router.delete('/:id', deleteBoard);

module.exports = router;

