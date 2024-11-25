import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dungeons from './pages/Dungeons';
import NavigationButtons from './components/NavigationButtons'; // Separate component for buttons

const App = () => {
  return (
    <div>
      <NavigationButtons />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dungeons" element={<Dungeons />} />
      </Routes>
    </div>
  );
};

export default App;
