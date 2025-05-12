import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import {backEndApiUrl} from '../config';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Login credentials:', email, password);
      console.log('API URL:', `${backEndApiUrl}/auth/login`);
      const res = await API.post(`${backEndApiUrl}/auth/login`, { email, password });
      console.log('Login response:', res.data);
      dispatch(login(res.data));
      navigate('/');
    } catch (err) {
      console.error('Login failed.', err);
      alert('Logion failed. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
