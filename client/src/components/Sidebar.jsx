import React, { useEffect, useState } from 'react';
import '../styles/Sidebar.css';
import { getBoards, createBoard } from '../services/boardService';
import Modal from './Modal.jsx';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const Sidebar = ({ selectedBoardId, onBoardSelect }) => {
  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

  useEffect(() => {
    getBoards().then((data) => setBoards(data));
  }, []);

  const handleCreateBoard = async () => {
    if (!newBoardName.trim()) {
      toast.warn('Board name cannot be empty!'); // Warning toast if name is empty
      return;
    }

    try {
      const newBoard = await createBoard(newBoardName);
      if (newBoard) {
        setBoards((prev) => [...prev, newBoard]);
        setNewBoardName('');
        setShowModal(false);
        toast.success('Board created successfully! 🎉'); // Success toast
      } else {
        toast.error('Failed to create board. Please try again.'); // Generic error if newBoard is null/undefined
      }
    } catch (error) {
      console.error('Error creating board:', error);
      toast.error('Error creating board: ' + (error.response?.data?.message || error.message || 'Unknown error')); // Failure toast with more detail
    }
  };

  return (
    <div className="sidebar">
      <h2>Boards</h2>
      <ul className="board-list">
        {boards.map((board) => (
          <li
            key={board._id}
            className={board._id === selectedBoardId ? 'active' : ''}
            onClick={() => onBoardSelect(board._id)}
          >
            {board.name}
          </li>
        ))}
      </ul>

      <button className="add-board-btn" onClick={() => setShowModal(true)}>
        + Create Board
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateBoard}
      >
        <h3>New Board</h3>
        <input
          type="text"
          placeholder="Enter board name"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
      </Modal>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Sidebar;