import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme, user, setUser }) => {
  const handleLogin = (response) => {
    window.open('http://localhost:8080/api/auth/google', '_self');
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'GET',
        credentials: 'include'
      });
      setUser(null);
      window.location.href = '/'; // manually redirect to home
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="header">
      <img src="/images.png" alt="Logo" className="logo" />
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
      </div>
      <div className="toggle-container">
        <input
          type="checkbox"
          id="themeToggle"
          className="toggle-button"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <label htmlFor="themeToggle">Dark Mode</label>
      </div>
      <div className="auth-container">
        {user ? (
          <button className="auth-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="auth-button" onClick={handleLogin}>
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
