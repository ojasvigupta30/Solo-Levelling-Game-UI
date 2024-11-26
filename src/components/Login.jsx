import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (eve) => {
        eve.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
                username,
                password,
            });

            alert('Login successful');
            localStorage.setItem('token', response.data.token); // Save token for authentication
        } catch (error) {
            alert('Login failed: ' + error.response?.data?.message || error.message);
        }
    };

    return (
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
    );
};

export default Login;
