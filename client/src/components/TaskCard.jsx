import React, { useState } from 'react';
import '../styles/TaskCard.css';
import { updateTask, deleteTask } from '../services/taskService';

const TaskCard = ({ task, onTaskUpdate, onTaskDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const updated = await updateTask(task._id, editedTask);
    if (updated) {
      onTaskUpdate(updated);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    const result = await deleteTask(task._id);
    if (result && result.message === 'Task deleted successfully') {
      onTaskDelete(task._id);
    }
  };

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/json', JSON.stringify(task));
      }}
    >
      {isEditing ? (
        <>
          <input
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            placeholder="Task Title"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            placeholder="Task Description"
          />
          <select name="status" value={editedTask.status} onChange={handleChange}>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <div className="task-actions">
            <button onClick={handleUpdate}>💾 Save</button>
            <button onClick={() => setIsEditing(false)}>❌ Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <div className="task-meta">
            <span className={`status ${task.status}`}>{task.status}</span>
          </div>
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
            <button onClick={handleDelete}>🗑️ Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;



