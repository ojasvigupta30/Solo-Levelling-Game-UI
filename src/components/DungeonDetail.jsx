import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDungeons } from '../api/dungeonApi';

const DungeonDetail = () => {
    const { id } = useParams(); // Get dungeon ID from URL
    const navigate = useNavigate();
    const [dungeon, setDungeon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDungeon = async () => {
            try {
                setLoading(true);
                const allDungeons = await getDungeons();
                const selectedDungeon = allDungeons.find((d) => d._id === id);
                if (selectedDungeon) {
                    setDungeon(selectedDungeon);
                } else {
                    setError('Dungeon not found');
                }
            } catch (err) {
                setError('Failed to fetch dungeon details');
            } finally {
                setLoading(false);
            }
        };

        fetchDungeon();
    }, [id]);

    if (loading) {
        return <p>Loading dungeon details...</p>;
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Dungeon: {dungeon.name}</h2>
            <p>Difficulty: {dungeon.difficulty}</p>
            <h3>Monsters:</h3>
            <ul>
                {dungeon.monsters.map((monster) => (
                    <li key={monster._id}>
                        <strong>{monster.name}</strong> - HP: {monster.health}, Attack: {monster.attack}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
};

export default DungeonDetail;
