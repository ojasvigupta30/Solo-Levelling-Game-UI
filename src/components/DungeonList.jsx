import { useState, useEffect } from 'react';
import { getDungeons } from '../api/dungeonApi';

const DungeonList = () => {
    const [dungeons, setDungeons] = useState([]);

    useEffect(() => {
        const fetchDungeons = async () => {
            const data = await getDungeons();
            setDungeons(data);
        };

        fetchDungeons();
    }, []);

    return (
        <div>
            <h2>Available Dungeons</h2>
            <ul>
                {dungeons.map((dungeon) => (
                    <li key={dungeon._id}>
                        {dungeon.name} - {dungeon.difficulty}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DungeonList;
