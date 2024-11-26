import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlayerForm = () => {
    const [playerForm, setPlayerForm] = useState('');
    const navigate = useNavigate();

    const handlePlayerFormSubmit = async (eve) => {
        eve.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You must be logged in to create a player name');
                navigate('/login');
                return;
            }

            await axios.post(`${import.meta.env.VITE_API_URL}/players`, { playerForm }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert('Player name set successfully!');
            navigate('/home'); // Navigate to the main game page
        } catch (error) {
            alert('Failed to set player name: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div>
            <h1>Select Your Player Name</h1>
            <form onSubmit={handlePlayerFormSubmit}>
                <input
                    type="text"
                    placeholder="Enter a unique player name"
                    value={playerForm}
                    onChange={(eve) => setPlayerForm(eve.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PlayerForm;
