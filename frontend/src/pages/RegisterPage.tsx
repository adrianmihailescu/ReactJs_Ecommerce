import React, { useState, FormEvent } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import { backEndApiUrl } from '../config';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const registerPath = `${backEndApiUrl}/auth/register`;
      await API.post(registerPath, { name, email, password });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err: any) {
      console.error('Registration failed.', err);
      alert('Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
