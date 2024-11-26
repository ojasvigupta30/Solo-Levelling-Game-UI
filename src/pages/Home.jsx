import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Assuming you save username in localStorage

  return (
    <div>
      <h1>Welcome to the Game</h1>
      <button onClick={() => navigate(`/profile/${username}`)}>View Profile</button>
      <button onClick={() => navigate('/dungeons')}>Explore Dungeons</button>
      <button onClick={() => navigate('/login')}>Log Out</button>
    </div>
  );
};

export default Home;
