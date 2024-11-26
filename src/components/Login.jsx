import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (eve) => {
        eve.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
                username,
                password,
            });

            localStorage.setItem('token', response.data.token); // Save the token
            alert('Login successful');
            navigate('/home'); // Navigate to Home page
        } catch (error) {
            alert('Login failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(eve) => setUsername(eve.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(eve) => setPassword(eve.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <button onClick={() => navigate('/register')}>New User? Register Here</button>
        </div>
    );
};

export default Login;
