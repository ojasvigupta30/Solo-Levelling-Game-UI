import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import Dungeons from './pages/Dungeons';
import DungeonDetail from './components/DungeonDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dungeons" element={<Dungeons />} />
      <Route path="/dungeons/:id" element={<DungeonDetail />} />
      {/* Redirect any unmatched routes to login */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default App;
