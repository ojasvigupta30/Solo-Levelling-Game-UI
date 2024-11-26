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
    <div className="container center">
      <h1>Available Dungeons</h1>
      <div className="grid">
        {dungeons.map((dungeon) => (
          <div className="card" key={dungeon._id}>
            <h3>{dungeon.name}</h3>
            <p>Difficulty: {dungeon.difficulty}</p>
            <button onClick={() => navigate(`/dungeons/${dungeon._id}`)}>View Details</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default Dungeons;
