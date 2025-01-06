import React, { useState, useEffect, createContext, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import RatePage from './Pages/Rate/Rate';
import { GoogleOAuthProvider } from '@react-oauth/google';  // Importing OAuth Provider
import './App.css';

export const ImageCacheContext = createContext(new Map());

const App = () => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);  // Store user information

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  return (
    <GoogleOAuthProvider clientId="948515176945-sjmmegljddvn9bqatuepinc17b7b2ki4.apps.googleusercontent.com"> 
      <ImageCacheContext.Provider value={new Map()}>
        <Router>
          <Navbar theme={theme} toggleTheme={toggleTheme} user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rate" element={<RatePage />} />
          </Routes>
        </Router>
      </ImageCacheContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
