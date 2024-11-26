import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDungeonById } from '../api/dungeonApi';

const DungeonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dungeon, setDungeon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDungeon = async () => {
      const token = localStorage.getItem('token');
      try {
        const data = await getDungeonById(id, token);
        setDungeon(data);
      } catch (error) {
        alert('Error fetching dungeon details: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchDungeon();
  }, [id]);

  if (loading) return <p>Loading dungeon details...</p>;
  if (!dungeon) return <p>Dungeon not found.</p>;

  return (
    <div>
      <h1>Dungeon: {dungeon.name}</h1>
      <p>Difficulty: {dungeon.difficulty}</p>
      <h3>Loot:</h3>
      <ul>
        {dungeon.loot.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>Monsters:</h3>
      <ul>
        {dungeon.monsters.map((monster) => (
          <li key={monster._id}>
            <h4>{monster.name}</h4>
            <p>Health: {monster.health}</p>
            <p>Attack: {monster.attack}</p>
            <p>Defense: {monster.defense}</p>
            <button
              onClick={() =>
                navigate('/combat', { state: { dungeonName: dungeon.name, monster } })
              }
            >
              Explore Dungeon
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/dungeons')}>Back to Dungeons</button>
    </div>
  );
};

export default DungeonDetail;
