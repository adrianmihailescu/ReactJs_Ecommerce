import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import { backEndApiUrl } from '../config';
import type { AppDispatch } from '../redux/store';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await API.post(`${backEndApiUrl}/auth/login`, { email, password });
      dispatch(login(res.data));
      navigate('/');
    } catch (err) {
      console.error('Login failed.', err);
      alert('Login failed. Please try again later.');
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={handlePasswordChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
