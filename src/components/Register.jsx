import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (eve) => {
        eve.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, {
                username,
                password,
                email,
            });

            alert('Registration successful');
            navigate('/login'); // Navigate back to login page
        } catch (error) {
            alert('Registration failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
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
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(eve) => setEmail(eve.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account?{' '}
                <button onClick={() => navigate('/login')}>
                    Login Here
                </button>
            </p>
        </div>
    );
};

export default Register;
