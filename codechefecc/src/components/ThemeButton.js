import React, { useState, useEffect } from 'react';

const ThemeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const preferredTheme = localStorage.getItem('theme');
    if (preferredTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevIsDarkMode => !prevIsDarkMode);
    const newTheme = isDarkMode ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const applyTheme = (theme) => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  };

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeButton;
