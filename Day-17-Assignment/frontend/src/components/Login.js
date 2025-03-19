import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Login Component
 * - Collects user's credentials and posts them to the backend API.
 * - On successful authentication, stores the JWT token and navigates to the Employee List.
 * - On failure, a generic error message is shown without exposing sensitive details.
 */
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  /**
   * Handles login form submission.
   * Sends a POST request to the backend /api/Auth/login route.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login credentials to the backend
      const response = await axios.post('http://localhost:5137/api/Auth/login', { username, password });
      
      // Save the JWT token in localStorage for subsequent API calls.
      localStorage.setItem('token', response.data.token);
      
      // Navigate to the employee list page upon successful login.
      navigate('/');
    } catch (error) {
      // Log error details in the console for debugging purposes.
      console.error('Login failed:', error);
      
      // Show a generic error alert without exposing valid login details.
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
