import React, { useState, useEffect, createContext, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import RatePage from './Pages/Rate/Rate';
import LoginFailed from './Pages/LoginFailed/LoginFailed';
import ReviewedProfessorsPage from './Pages/ReviewPage/ReviewPage';
import './App.css';

export const ImageCacheContext = createContext(new Map());

const App = () => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null); // Store user information

  // Set theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Fetch user session on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/login/success', {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user); 
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('User not logged in:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  return (
    <ImageCacheContext.Provider value={new Map()}>
      <Router>
        <Navbar theme={theme} toggleTheme={toggleTheme} user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/rate" element={<RatePage user={user} />} />
          <Route path="/login-failed" element={<LoginFailed />} /> 
          <Route path="/reviewed" element={<ReviewedProfessorsPage />} />
        </Routes>
      </Router>
    </ImageCacheContext.Provider>
  );
};

export default App;
