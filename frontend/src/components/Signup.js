// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const navigate = useNavigate()
//   const history = useHistory();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3002/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, mobile, email, password, role:"user", roleId:Math.floor(Math.random() * (9999 - 0 + 1) + 0) }),
      });
      
      const data = await response.json();

      if (data.result === true) {
        setMessage('Signup Success! Redirecting to login in 5 seconds');
        setMessageColor('bg-green-500');
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } else {
        setMessage(data.message);
        console.log(data)
        setMessageColor('bg-red-500');
      }
    } catch (error) {
      setMessage('Error Occurred');
      setMessageColor('bg-red-500');
    }
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-2xl mb-4">Signup</h1>
      {message && <div className={`${messageColor} text-white p-2 mb-4`}>{message}</div>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300"
        />
        <input
          type="tel"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300"
        />
        <input
          type="email"
          placeholder="Email"
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
        <button type="submit" className="w-full bg-blue-500 text-white py-2">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
