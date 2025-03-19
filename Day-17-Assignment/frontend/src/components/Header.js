import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Header Component
 * Displays the header with application title and Logout button.
 * The Logout button is hidden when on the login page.
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't render the header on the login page.
  if (location.pathname === '/login') {
    return null;
  }

  /**
   * Handles logout by removing the token from storage and navigating to /login.
   */
  const handleLogout = () => {
    // Remove JWT token from local storage.
    localStorage.removeItem('token');
    // Navigate back to the login page.
    navigate('/login');
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Employee Management System</h2>
      <button className="btn btn-secondary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
