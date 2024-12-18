import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import SetPlayerName from './pages/SetPlayerName';
import GameDashboard from './pages/GameDashboard';
import PlayerProfile from './components/PlayerProfile';
import Home from './pages/Home';
import Dungeons from './pages/Dungeons';
import DungeonDetail from './components/DungeonDetail';
import Combat from './pages/Combat';
import './index.css'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/set-player-name" element={<SetPlayerName />} />
      <Route path="/dashboard" element={<GameDashboard />} />
      <Route path="/profile" element={<PlayerProfile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dungeons" element={<Dungeons />} />
      <Route path="/dungeons/:id" element={<DungeonDetail />} />
      <Route path="/combat" element={<Combat />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
