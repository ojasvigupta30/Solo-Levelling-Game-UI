import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlayer, addXP } from '../api/playerApi';

const PlayerProfile = ({ username }) => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayer = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const data = await getPlayer(username, token);
        setPlayer(data);
      } catch (error) {
        alert('Error fetching player details: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [username, navigate]);

  const handleAddXP = async (xpGained) => {
    try {
      const token = localStorage.getItem('token');
      const updatedPlayer = await addXP(username, xpGained, token);
      setPlayer(updatedPlayer.player);
      alert('XP added successfully!');
    } catch (error) {
      alert('Error adding XP: ' + error.message);
    }
  };

  if (loading) return <p>Loading player details...</p>;
  if (!player) return <p>Player not found.</p>;

  return (
    <div>
      <h1>Player Profile: {player.username}</h1>
      <p>Level: {player.level}</p>
      <p>XP: {player.xp}</p>
      <h3>Stats:</h3>
      <p>Health: {player.stats.health}</p>
      <p>Attack: {player.stats.attack}</p>
      <p>Defense: {player.stats.defense}</p>
      <h3>Inventory:</h3>
      <ul>
        {player.inventory.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>Skills:</h3>
      <ul>
        {player.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <button onClick={() => handleAddXP(50)}>Gain 50 XP</button>
      <button onClick={() => navigate('/home')}>Back to Home</button>
    </div>
  );
};

export default PlayerProfile;
