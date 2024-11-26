import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlayer } from '../api/playerApi';

const PlayerProfile = () => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayer = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      if (!token || !username) {
        navigate('/login');
        return;
      }

      try {
        const playerData = await getPlayer(username, token);
        setPlayer(playerData);
      } catch (error) {
        alert('Error fetching player profile: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [navigate]);

  if (loading) return <p>Loading player profile...</p>;
  if (!player) return <p>Player profile not found.</p>;

  return (
    <div>
      <h1>Player Profile: {player.username}</h1>
      <p>Level: {player.level}</p>
      <p>XP: {player.xp}</p>
      <h3>Stats</h3>
      <p>Health: {player.stats.health}</p>
      <p>Attack: {player.stats.attack}</p>
      <p>Defense: {player.stats.defense}</p>
      <h3>Inventory</h3>
      <ul>
        {player.inventory.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>Skills</h3>
      <ul>
        {player.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default PlayerProfile;
