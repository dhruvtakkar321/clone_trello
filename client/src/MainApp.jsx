// src/MainApp.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import BoardView from './components/BoardView';
import './App.css';

const MainApp = () => {
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  return (
    <div className="app-container">
      <Sidebar selectedBoardId={selectedBoardId} onBoardSelect={setSelectedBoardId} />
      <div className="main-content">
        {selectedBoardId ? <BoardView boardId={selectedBoardId} /> : <h2>Select a board</h2>}
      </div>
    </div>
  );
};

export default MainApp;

