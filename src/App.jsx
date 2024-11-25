import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dungeons from './pages/Dungeons';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dungeons" element={<Dungeons />} />
      </Routes>
    </div>
  );
};

export default App;
