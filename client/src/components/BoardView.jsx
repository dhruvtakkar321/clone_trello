import React, { useEffect, useState } from 'react';
import {
  getTasksByBoard,
  createTask,
  updateTask,
  deleteTask,
} from '../services/taskService';
import AddTaskModal from './AddTaskModal';
import TaskCard from './TaskCard';
import '../styles/BoardView.css';
import { toast } from 'react-toastify'; // Import toast

const BoardView = ({ boardId }) => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('todo');

  const fetchTasks = async () => {
    try {
      const data = await getTasksByBoard(boardId);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks.');
    }
  };

  useEffect(() => {
    if (boardId) fetchTasks();
  }, [boardId]);

  const groupedTasks = {
    todo: [],
    inprogress: [],
    done: [],
  };

  tasks.forEach((task) => {
    groupedTasks[task.status]?.push(task);
  });

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(boardId, {
        ...taskData,
        status: selectedStatus,
      });
      if (newTask) {
        setTasks((prev) => [...prev, newTask]);
        setShowModal(false);
        toast.success('Task created successfully! 🎉'); // Success toast for task creation
      } else {
        toast.error('Failed to create task. Please try again.'); // Generic error if newTask is null/undefined
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Error creating task: ' + (error.response?.data?.message || error.message || 'Unknown error')); // Failure toast for task creation
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      toast.info('Task deleted.'); // Info toast for task deletion
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const updated = await updateTask(taskId, updatedData);
      if (updated) {
        setTasks((prev) =>
          prev.map((task) => (task._id === taskId ? updated : task))
        );
        toast.success('Task updated successfully!'); // Success toast for task update
      } else {
        toast.error('Failed to update task. Please try again.');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Error updating task: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    }
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskData = JSON.parse(e.dataTransfer.getData('application/json'));

    if (taskData.status === newStatus) return; // no change

    try {
      const updated = await updateTask(taskData._id, {
        ...taskData,
        status: newStatus,
      });

      if (updated) {
        setTasks((prev) =>
          prev.map((task) => (task._id === updated._id ? updated : task))
        );
        toast.success(`Task moved to ${newStatus.toUpperCase()}!`); // Success toast for drag & drop update
      } else {
        toast.error('Failed to move task. Please try again.');
      }
    } catch (error) {
      console.error('Error updating task status via drag/drop:', error);
      toast.error('Error moving task: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    }
  };

  return (
    <div className="board-view">
      {['todo', 'inprogress', 'done'].map((status) => (
        <div
          key={status}
          className="task-column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, status)}
        >
          <h3>{status.toUpperCase()}</h3>
          {groupedTasks[status].map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onTaskUpdate={handleUpdateTask} // Pass handleUpdateTask directly
              onTaskDelete={handleDeleteTask} // Pass handleDeleteTask directly
            />
          ))}
          <button
            onClick={() => {
              setSelectedStatus(status);
              setShowModal(true);
            }}
          >
            + Add Task
          </button>
        </div>
      ))}
      <AddTaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateTask}
      />
      {/* ToastContainer should ideally be in your App.js or root component */}
      {/* <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> */}
    </div>
  );
};

export default BoardView;