'use client'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { darkModeState } from '../lib/redux/featuresSlice/toggleDarkModeSlice';

export default function useToggleDarkMode() {
  const darkMode = useSelector(darkModeState);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return darkMode;
}
