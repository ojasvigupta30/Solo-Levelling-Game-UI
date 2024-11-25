import { useState } from 'react';
import PlayerForm from '../components/PlayerForm';

const Home = () => {
    const [player, setPlayer] = useState(null);

    const handlePlayerCreated = (newPlayer) => {
        setPlayer(newPlayer);
    };

    return (
        <div>
            <h1>Solo Leveling Game</h1>
            {player ? (
                <p>Welcome, {player.username}! Level: {player.level}</p>
            ) : (
                <PlayerForm onPlayerCreated={handlePlayerCreated} />
            )}
        </div>
    );
};

export default Home;
