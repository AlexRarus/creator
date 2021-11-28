import React, { createContext, useContext } from 'react';

import { useThemeMode } from './hooks';

const Context = createContext<any>({});
const Provider = Context.Provider;

export const CustomThemeProvider = ({ children }: any) => {
  const [themeType, toggleTheme, initialThemesList] = useThemeMode();
  return <Provider value={{ themeType, toggleTheme, initialThemesList }}>{children}</Provider>;
};

export const useThemeContext = () => useContext(Context);
