import { createContext, useState, useMemo, useContext, memo } from 'react';

const ThemeContext = createContext();

const ThemeProvider = memo(({ initialTheme = 'light', children }) => {
  const [theme, setTheme] = useState(initialTheme);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
});

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw Error('ThemeContext need to be used in a ThemeProvider');
  return context;
};

export { ThemeProvider, useTheme };
