import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = ({ theme, toggleTheme, user, setUser }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    window.open('http://localhost:8080/api/auth/google', '_self');
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'GET',
        credentials: 'include'
      });
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="header">
      <img src="/images.png" alt="Logo" className="logo" />

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
      </div>

      <div className="right-container">
        <div className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark' ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
        </div>

        <div className="auth-container">
          {user ? (
            <div className="profile-container">
              <img
                src="/default.jpg"
                alt="Profile"
                className="profile-pic"
                onClick={handleProfileClick}
              />
              {showDropdown && (
                <div className="dropdown-menu animated-dropdown">
                  <button onClick={() => {
                    navigate('/reviewed');
                    setShowDropdown(false);
                  }}>
                    View Reviewed Professors
                  </button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button className="auth-button" onClick={handleLogin}>Login with Google</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
