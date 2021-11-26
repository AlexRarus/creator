import React, { createContext, useContext } from 'react';

import { useDarkMode } from './hooks';

const Context = createContext<any>({});
const Provider = Context.Provider;

export const DarkThemeProvider = ({ children }: any) => {
  const [themeType, toggleTheme] = useDarkMode();
  return <Provider value={{ themeType, toggleTheme }}>{children}</Provider>;
};

export const useDarkThemeContext = () => useContext(Context);
