const BASE_URL = 'http://localhost:5000';

export const getBoards = async () => {
  try {
    const response = await fetch(`${BASE_URL}/board`);
    if (!response.ok) {
      throw new Error('Failed to fetch boards');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getBoards:', error);
    return [];
  }
};

export const createBoard = async (boardName) => {
  try {
    const response = await fetch(`${BASE_URL}/board`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: boardName })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating board:', error);
    return null;
  }
};

