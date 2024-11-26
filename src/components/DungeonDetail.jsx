import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDungeons } from '../api/dungeonApi';

const DungeonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dungeon, setDungeon] = useState(null);

    useEffect(() => {
        const fetchDungeon = async () => {
            const data = await getDungeons();
            const selectedDungeon = data.find((d) => d._id === id);
            setDungeon(selectedDungeon);
        };

        fetchDungeon();
    }, [id]);

    if (!dungeon) return <p>Loading dungeon details...</p>;

    return (
        <div>
            <h1>{dungeon.name}</h1>
            <p>Difficulty: {dungeon.difficulty}</p>
            <h3>Monsters:</h3>
            <ul>
                {dungeon.monsters.map((monster) => (
                    <li key={monster._id}>
                        {monster.name} - HP: {monster.health}, Attack: {monster.attack}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/dungeons')}>Back to Dungeons</button>
        </div>
    );
};

export default DungeonDetail;
