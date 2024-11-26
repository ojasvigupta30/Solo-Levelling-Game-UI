import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDungeons } from '../api/dungeonApi';

const Dungeons = () => {
    const [dungeons, setDungeons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDungeons = async () => {
            const data = await getDungeons();
            setDungeons(data);
        };

        fetchDungeons();
    }, []);

    return (
        <div>
            <h1>Dungeons</h1>
            <ul>
                {dungeons.map((dungeon) => (
                    <li key={dungeon._id}>
                        <h3>{dungeon.name} - Difficulty: {dungeon.difficulty}</h3>
                        <button onClick={() => navigate(`/dungeons/${dungeon._id}`)}>
                            Explore
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/home')}>Back to Home</button>
        </div>
    );
};

export default Dungeons;
