import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { battleMonster } from '../api/combatApi';

const Combat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dungeonName, monster } = location.state;
  const [battleResult, setBattleResult] = useState(null);
  const [lootGained, setLootGained] = useState([]);
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBattle = async () => {
    setLoading(true);
    const playerName = localStorage.getItem('username');

    try {
      const token = localStorage.getItem('token');
      const response = await battleMonster({ playerName, monsterId: monster._id }, token);

      setBattleResult(response.message);
      setLootGained(response.lootGained);
      setPlayerStats(response.player);
    } catch (error) {
      alert('Error during battle: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading battle...</p>;

  return (
    <div className="center">
      <h1>Combat: {dungeonName}</h1>
      <h2>Monster: {monster.name}</h2>
      <p>Health: {monster.health}</p>
      <p>Attack: {monster.attack}</p>
      <p>Defense: {monster.defense}</p>

      {battleResult ? (
        <div>
          <h3>{battleResult}</h3>
          {lootGained.length > 0 && (
            <div>
              <h4>Loot Gained:</h4>
              <ul>
                {lootGained.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {playerStats && (
            <div>
              <h4>Updated Player Stats:</h4>
              <p>Level: {playerStats.level}</p>
              <p>XP: {playerStats.xp}</p>
              <p>Health: {playerStats.stats.health}</p>
              <p>Attack: {playerStats.stats.attack}</p>
              <p>Defense: {playerStats.stats.defense}</p>
              <h4>Updated Inventory:</h4>
              <ul>
                {playerStats.inventory.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={() => navigate('/dungeons')}>Back to Dungeons</button>
        </div>
      ) : (
        <button onClick={handleBattle}>Engage in Combat</button>
      )}
    </div>
  );
};

export default Combat;
