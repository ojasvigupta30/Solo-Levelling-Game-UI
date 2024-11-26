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
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const data = await getDungeons(token);
        setDungeons(data);
      } catch (error) {
        alert('Error fetching dungeons: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDungeons();
  }, [navigate]);

  if (loading) return <p>Loading dungeons...</p>;

  return (
    <div>
      <h1>Available Dungeons</h1>
      <ul>
        {dungeons.map((dungeon) => (
          <li key={dungeon._id}>
            <h3>{dungeon.name} - {dungeon.difficulty}</h3>
            <button onClick={() => navigate(`/dungeons/${dungeon._id}`)}>Explore</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/home')}>Back to Home</button>
    </div>
  );
};

export default Dungeons;
