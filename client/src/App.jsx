import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Router';

import './App.css';


function App() {
  
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage or use system preference as fallback
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    // Default to user's system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router basename='/'>
      <AppRoutes darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </Router>
  );
}

export default App;

