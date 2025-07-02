const BASE_URL = 'http://localhost:5000';

export const getTasksByBoard = async (boardId) => {
  try {
    const response = await fetch(`${BASE_URL}/boards/${boardId}/task`);
    return await response.json();
  } catch (err) {
    console.error('Error fetching tasks:', err);
    return [];
  }
};

export const createTask = async (boardId, taskData) => {
  try {
    const response = await fetch(`${BASE_URL}/boards/${boardId}/task`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  } catch (err) {
    console.error('Error creating task:', err);
    return null;
  }
};

export const updateTask = async (taskId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/task/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    return await response.json();
  } catch (err) {
    console.error('Error updating task:', err);
    return null;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${BASE_URL}/task/${taskId}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (err) {
    console.error('Error deleting task:', err);
    return null;
  }
};
