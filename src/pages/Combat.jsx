import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { battleMonster } from '../api/combatApi';

const Combat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dungeonName, monster } = location.state; // Data passed from Dungeon Details
  const [battleResult, setBattleResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBattle = async () => {
    setLoading(true);
    const playerName = localStorage.getItem('username');

    try {
      const token = localStorage.getItem('token');
      const response = await battleMonster({ playerName, monsterId: monster._id }, token);
      setBattleResult(response);
    } catch (error) {
      alert('Error during battle: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) return <p>Loading...</p>;

  return (
    <div className='center'>
      <h1>Combat: {dungeonName}</h1>
      <h2>Monster: {monster.name}</h2>
      <p>Health: {monster.health}</p>
      <p>Attack: {monster.attack}</p>
      <p>Defense: {monster.defense}</p>

      {battleResult ? (
        <div>
          <h3>{battleResult.message}</h3>
          <button onClick={() => navigate('/dungeons')}>Back to Dungeons</button>
        </div>
      ) : (
        <button onClick={handleBattle}>Engage in Combat</button>
      )}
    </div>
  );
};

export default Combat;
