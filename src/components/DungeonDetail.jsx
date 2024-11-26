import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDungeonById } from '../api/dungeonApi';

const DungeonDetail = () => {
  const { id } = useParams(); // Automatically picks up the dungeon ID from routing
  const navigate = useNavigate();
  const [dungeon, setDungeon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDungeon = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const data = await getDungeonById(id, token);
        setDungeon(data);
      } catch (error) {
        alert('Error fetching dungeon details: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDungeon();
  }, [id, navigate]);

  if (loading) return <p>Loading dungeon details...</p>;
  if (!dungeon) return <p>Dungeon not found.</p>;

  return (
    <div>
      <h1>{dungeon.name}</h1>
      <p>Difficulty: {dungeon.difficulty}</p>
      <h3>Monsters</h3>
      <ul>
        {dungeon.monsters.map((monster) => (
          <li key={monster._id}>
            <strong>{monster.name}</strong> - HP: {monster.health}, Attack: {monster.attack}
          </li>
        ))}
      </ul>
      <h3>Possible Loot</h3>
      <ul>
        {dungeon.loot.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/dungeons')}>Back to Dungeons</button>
    </div>
  );
};

export default DungeonDetail;
