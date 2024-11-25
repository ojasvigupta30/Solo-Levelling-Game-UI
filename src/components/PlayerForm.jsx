import { useState } from 'react';
import { createPlayer } from '../api/playerApi';

const PlayerForm = ({ onPlayerCreated }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = async (eve) => {
        eve.preventDefault();
        const newPlayer = await createPlayer({ username });
        onPlayerCreated(newPlayer);
        setUsername('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(eve) => setUsername(eve.target.value)}
                placeholder="Enter your username"
                required
            />
            <button type="submit">Create Player</button>
        </form>
    );
};

export default PlayerForm;
