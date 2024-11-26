import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createPlayer = async (data, token) => {
  return axios.post(`${API_URL}/players`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
