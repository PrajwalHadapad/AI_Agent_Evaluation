import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  AURORA: 'aurora',
  OCEAN: 'ocean',
  FOREST: 'forest',
  SUNSET: 'sunset',
  MIDNIGHT: 'midnight',
  LIGHT: 'light',
};

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('eval-theme') || THEMES.AURORA;
  });

  const setTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setThemeState(newTheme);
      localStorage.setItem('eval-theme', newTheme);
    }
  };

  useEffect(() => {
    // Remove any previous theme- classes on documentElement
    const html = document.documentElement;
    const classesToRemove = Array.from(html.classList).filter((c) =>
      c.startsWith('theme-')
    );
    classesToRemove.forEach((c) => html.classList.remove(c));

    // Add current theme class (except default aurora)
    if (theme !== THEMES.AURORA) {
      html.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
