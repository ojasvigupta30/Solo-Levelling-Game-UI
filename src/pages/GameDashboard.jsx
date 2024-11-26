import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className='center'>
      <h1>Game Dashboard</h1>
      <button onClick={() => navigate('/profile')}>View Player Profile</button>
      <button onClick={() => navigate('/dungeons')}>Explore Dungeons</button>
      <button onClick={() => {
        localStorage.clear();
        navigate('/login');
      }}>Log Out</button>
    </div>
  );
};

export default GameDashboard;
