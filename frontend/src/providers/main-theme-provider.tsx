import React, { createContext, useContext, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { isMobile as isMobileDevice } from 'react-device-detect';

import { ITheme, DARK_THEME, LIGHT_THEME } from '../components/theme';

import { useThemeMode } from './hooks';

const Context = createContext<any>({});
const Provider = Context.Provider;

export const MainThemeProvider = ({ children }: any) => {
  const [DEVICE_THEME, setTheme] = useState<ITheme>(LIGHT_THEME);
  const isMobile = useMediaQuery('(max-width:768px)') || isMobileDevice;
  const isTablet = useMediaQuery('(max-width:1000px)');
  const [themeType, toggleTheme, initialThemesList] = useThemeMode();

  useEffect(() => {
    const theme = themeType === 'light' ? LIGHT_THEME : DARK_THEME;
    setTheme({
      ...theme,
      isTablet,
      isMobile,
    });
  }, [isTablet, isMobile, themeType]);

  return (
    <Provider value={{ themeType, toggleTheme, initialThemesList, DEVICE_THEME }}>
      {children}
    </Provider>
  );
};

export const useThemeContext = () => useContext(Context);
