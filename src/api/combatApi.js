import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const battleMonster = async (data, token) => {
  const response = await axios.post(`${API_URL}/combat/battle`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
