import { Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dungeons from './pages/Dungeons';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dungeons" element={<Dungeons />} />
      </Routes>
    </Router>
  );
};

export default App;
