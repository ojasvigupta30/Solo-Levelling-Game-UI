import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { battleMonster } from '../api/combatApi';
import CombatCanvas from '../components/CombatCanvas';

const Combat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dungeonName, monster } = location.state || {};

  if (!dungeonName || !monster) {
    console.warn('Invalid state received. Redirecting to dungeons.');
    navigate('/dungeons');
    return null;
  }

  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(monster.health);
  const [battleResult, setBattleResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [triggerSkillEffect, setTriggerSkillEffect] = useState(false);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(true);

  const handleBattle = async () => {
    setLoading(true);
    const playerName = localStorage.getItem('username');

    try {
      const token = localStorage.getItem('token');
      const response = await battleMonster({ playerName, monsterId: monster._id }, token);

      // Simulate attack animations
      animateAttack(true); // Player attacks first
      setTimeout(() => animateAttack(false), 1000); // Monster attacks after 1 second

      // Update health values
      setPlayerHealth((prev) => Math.max(prev - Math.random() * 20, 0));
      setMonsterHealth((prev) => Math.max(prev - Math.random() * 20, 0));

      // Determine the result
      if (playerHealth <= 0) {
        setBattleResult('Defeat! You were defeated by the monster.');
      } else if (monsterHealth <= 0) {
        setBattleResult('Victory! You defeated the monster.');
      } else {
        setBattleResult(response.message);
      }
    } catch (error) {
      console.error('Error during battle:', error);
      alert('Error during battle: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const animateAttack = (isPlayer) => {
    setIsPlayerAttacking(isPlayer);
    setTriggerSkillEffect(true);
    setTimeout(() => setTriggerSkillEffect(false), 500); // Skill effect lasts for 0.5 seconds
  };

  if (loading) return <p>Loading battle...</p>;

  return (
    <div className="center">
      <h1>Combat: {dungeonName}</h1>
      <CombatCanvas
        playerHealth={playerHealth}
        monsterHealth={monsterHealth}
        triggerSkillEffect={triggerSkillEffect}
        isPlayerAttacking={isPlayerAttacking}
        battleResult={battleResult}
      />

      {battleResult ? (
        <div>
          <h3>{battleResult}</h3>
          <button onClick={() => navigate('/dungeons')}>Back to Dungeons</button>
        </div>
      ) : (
        <button onClick={handleBattle}>Engage in Combat</button>
      )}
    </div>
  );
};

export default Combat;
