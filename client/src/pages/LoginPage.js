import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const LoginPage = ({ setIsAdmin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await login(formData);
      localStorage.setItem('profile', JSON.stringify(data));
      setIsAdmin(true);
      navigate('/'); // Redirect to homepage on successful login
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <form onSubmit={handleSubmit} className="login-form">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Login</h2>
        {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;