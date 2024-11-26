import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Fetch all dungeons
export const getDungeons = async (token) => {
  const response = await axios.get(`${API_URL}/dungeons`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fetch dungeon by ID
export const getDungeonById = async (id, token) => {
  const response = await axios.get(`${API_URL}/dungeons/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
