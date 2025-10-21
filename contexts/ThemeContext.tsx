import React, { createContext, ReactNode, useState } from 'react';
import { useColorScheme } from 'react-native';


interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}


export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => console.warn('ThemeProvider not found'),
});


interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(systemTheme || 'light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};