import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlayer } from '../api/playerApi';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      try {
        const player = await getPlayer(username, token);
        setInventory(player.inventory);
      } catch (error) {
        alert('Error fetching inventory: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {inventory.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default Inventory;
