import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDungeons } from '../api/dungeonApi';

const Dungeons = () => {
  const [dungeons, setDungeons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDungeons = async () => {
      const token = localStorage.getItem('token');
      try {
        const data = await getDungeons(token);
        setDungeons(data);
      } catch (error) {
        alert('Error fetching dungeons: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchDungeons();
  }, []);

  if (loading) return <p>Loading dungeons...</p>;

  return (
    <div>
      <h1>Available Dungeons</h1>
      <ul>
        {dungeons.map((dungeon) => (
          <li key={dungeon._id}>
            <h3>{dungeon.name} - Difficulty: {dungeon.difficulty}</h3>
            <button onClick={() => navigate(`/dungeons/${dungeon._id}`)}>View Details</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default Dungeons;
