const Board = require('../models/board.model');

exports.createBoard = async (req, res) => {
  try {
    const { name } = req.body;
    const board = await Board.create({ name });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.getBoards = async (req, res) => {
  console.log("📥 GET /board hit"); // ✅ This line helps us trace the route

  try {
    const boards = await Board.find().sort({ createdAt: -1 });
    res.status(200).json(boards);
  } catch (err) {
    console.error("❌ Error in GET /board:", err); // ✅ This prints the actual error
    res.status(500).json({ error: err.message });
  }
};
// DELETE /board/:id
exports.deleteBoard = async (req, res) => {
    try {
      const board = await Board.findByIdAndDelete(req.params.id);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
      res.status(200).json({ message: 'Board deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // PUT /board/:id
  exports.updateBoard = async (req, res) => {
    try {
      const { name } = req.body;
      const board = await Board.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true, runValidators: true }
      );
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
      res.status(200).json(board);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

