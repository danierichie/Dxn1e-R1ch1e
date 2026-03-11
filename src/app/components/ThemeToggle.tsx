'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  try {
    const { theme, toggleTheme } = useTheme();

    return (
      <button
        onClick={toggleTheme}
        className="hover:bg-white/10 transition-colors"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-primary)',
          width: '40px',
          height: '40px',
        }}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    );
  } catch {
    // Return null if ThemeProvider isn't available yet
    return null;
  }
}
