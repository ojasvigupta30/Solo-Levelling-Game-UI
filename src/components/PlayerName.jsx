import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPlayer } from '../api/playerApi';

const PlayerName = () => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handlePlayerNameSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('You must be logged in to set a player name.');

      await createPlayer({ playerName }, token);
      navigate('/home'); // Navigate to Home page
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <h1>Set Player Name</h1>
      <form onSubmit={handlePlayerNameSubmit}>
        <input
          type="text"
          placeholder="Player Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PlayerName;
