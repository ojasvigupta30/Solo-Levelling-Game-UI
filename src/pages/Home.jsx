import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Game</h1>
      <button onClick={() => navigate('/dungeons')}>Explore Dungeons</button>
      <button onClick={() => navigate('/player-name')}>Set Player Name</button>
      <button onClick={() => navigate('/login')}>Log Out</button>
    </div>
  );
};

export default Home;
