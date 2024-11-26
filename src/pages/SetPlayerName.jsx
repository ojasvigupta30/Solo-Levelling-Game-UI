import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrUpdatePlayer } from '../api/playerApi';

const SetPlayerName = () => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!playerName) {
      alert('Player name cannot be empty.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) throw new Error('No token found. Please log in again.');

      await createOrUpdatePlayer({ username: playerName }, token);
      alert('Player name set successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Error setting player name: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <h1>Set Your Player Name</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Player Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
        />
        <button type="submit">Save Player Name</button>
      </form>
    </div>
  );
};

export default SetPlayerName;
