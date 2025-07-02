import React from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        {children}
        <button className="submit-btn" onClick={onSubmit}>Create</button>
      </div>
    </div>
  );
};

export default Modal;
