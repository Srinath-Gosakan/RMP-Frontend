import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';  // Import GoogleLogin component
import './Navbar.css';

const Navbar = ({ theme, toggleTheme, user, setUser }) => {
  const handleLoginSuccess = (response) => {
    // You can now send this response to your backend to verify the token
    setUser(response);  // Store the user's information in state
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed: ', error);
  };

  return (
    <div className="header">
      <img src="/images.png" alt="Logo" className="logo" />
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/rate" className={({ isActive }) => (isActive ? 'active' : '')}>
          Rate
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
      {user ? (
        <div className="user-info">
          <span>Welcome, {user.profile.name}</span>
          <img src={user.profile.picture} alt="User" className="user-avatar" />
        </div>
      ) : (
        <GoogleLogin 
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      )}
    </div>
  );
};

export default Navbar;
