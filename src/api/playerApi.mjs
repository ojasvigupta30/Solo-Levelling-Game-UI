import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createOrUpdatePlayer = async (data, token) => {
  const response = await axios.post(`${API_URL}/players`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getPlayer = async (username, token) => {
  const response = await axios.get(`${API_URL}/players/${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addXP = async (username, xpGained, token) => {
  const response = await axios.patch(`${API_URL}/players/${username}/xp`, { xpGained }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
