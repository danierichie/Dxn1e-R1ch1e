'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  try {
    const { theme, toggleTheme } = useTheme();

    return (
      <button
        onClick={toggleTheme}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          color: 'var(--text-primary)',
          fontSize: '1.2rem',
          width: '40px',
          height: '40px',
        }}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    );
  } catch {
    // Return null if ThemeProvider isn't available yet
    return null;
  }
}
