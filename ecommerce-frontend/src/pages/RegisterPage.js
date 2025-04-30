import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Registering user:', { name, email, password });
      // const registerPath = `${process.env.BACKEND_APP_API_URL}/auth/register`;
      const registerPath = 'http://localhost:5000/api/auth/register';
      await API.post(registerPath, { name, email, password });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
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
}

export default RegisterPage;
