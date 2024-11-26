import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dungeons from './pages/Dungeons';
import NavigationButtons from './components/NavigationButtons'; // Separate component for buttons
import DungeonDetail from './components/DungeonDetail';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <div>
      <NavigationButtons />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/dungeons" element={<Dungeons />} />
        <Route path="/dungeons/:id" element={<DungeonDetail />} />
      </Routes>
    </div>
  );
};

export default App;
