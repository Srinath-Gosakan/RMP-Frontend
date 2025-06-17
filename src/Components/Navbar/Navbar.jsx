import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme, user, setUser }) => {
  const handleLoginSuccess = (response) => {
    // You can now send this response to your backend to verify the token
    setUser(response);  // Store the user's information in state
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
    </div>
  );
};

export default Navbar;
