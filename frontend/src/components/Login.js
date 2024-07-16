// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3002/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data)

            if (data.result) {
                localStorage.setItem('jwt_token', data.responseData.token);
                setMessage('Login Success! Redirecting to flow in 5 seconds');
                setMessageColor('bg-green-500');
                setTimeout(() => {
                    navigate('/');
                }, 5000);
            } else {
                setMessage(data.message);
                setMessageColor('bg-red-500');
            }
        } catch (error) {
            console.log(error)
            setMessage('Error Occurred');
            setMessageColor('bg-red-500');
        }
    };

    return (
        <div className="container mx-auto mt-20">
            <h1 className="text-2xl mb-4">Login</h1>
            {message && <div className={`${messageColor} text-white p-2 mb-4`}>{message}</div>}
            <form onSubmit={e => handleSubmit(e)} className="max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300"
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2">Login</button>
            </form>
        </div>
    );
};

export default Login;

