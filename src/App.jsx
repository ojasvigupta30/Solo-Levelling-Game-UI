import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PlayerProfile from './components/PlayerProfile';
import Home from './pages/Home';
import Dungeons from './pages/Dungeons';
import DungeonDetail from './components/DungeonDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:username" element={<PlayerProfile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dungeons" element={<Dungeons />} />
      <Route path="/dungeons/:id" element={<DungeonDetail />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
