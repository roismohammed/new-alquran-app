import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { DEFAULT_CITY } from '../data/indonesianCities';

const SettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
  theme: 'light', // 'light' | 'dark' | 'system'
  arabicFontSize: 'medium', // 'small' | 'medium' | 'large' | 'xlarge'
  showTranslation: true,
  showLatin: true,
  showTafsir: false,
  location: {
    city: DEFAULT_CITY.name,
    country: DEFAULT_CITY.country,
    province: DEFAULT_CITY.province,
    lat: DEFAULT_CITY.lat,
    lng: DEFAULT_CITY.lng,
    isGeolocation: false
  },
  calculationMethod: 20, // 20: Kemenag RI
  defaultQari: '05', // Mishary Rashid Alafasy
  playbackSpeed: 1,
  language: 'id'
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('nurquran_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Apply dark mode class and colorScheme to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else if (settings.theme === 'light') {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    } else {
      // System mode
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applySystem = (matches) => {
        if (matches) {
          root.classList.add('dark');
          root.setAttribute('data-theme', 'dark');
          root.style.colorScheme = 'dark';
        } else {
          root.classList.remove('dark');
          root.setAttribute('data-theme', 'light');
          root.style.colorScheme = 'light';
        }
      };

      applySystem(mediaQuery.matches);
      const listener = (e) => applySystem(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [settings.theme]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nurquran_settings', JSON.stringify(settings));
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  }, [settings]);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateLocation = useCallback((locObj) => {
    setSettings(prev => ({
      ...prev,
      location: { ...prev.location, ...locObj }
    }));
  }, []);

  const toggleTheme = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        updateLocation,
        toggleTheme,
        resetSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
