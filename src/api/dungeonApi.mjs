import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getDungeons = async () => {
    const response = await axios.get(`${API_URL}/dungeons`);
    return response.data;
};

export const createDungeon = async (dungeonData) => {
    const response = await axios.post(`${API_URL}/dungeons`, dungeonData);
    return response.data;
};
