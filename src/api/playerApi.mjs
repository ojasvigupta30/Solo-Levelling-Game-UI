import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createPlayer = async (playerData) => {
    const response = await axios.post(`${API_URL}/players`, playerData);
    return response.data;
};

export const getPlayer = async (id) => {
    const response = await axios.get(`${API_URL}/players/${id}`);
    return response.data;
};
