import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDarkThemeContext } from 'src/providers/dark-theme-provider';
import { ThemeProvider } from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';

import { DARK_THEME, ITheme, LIGHT_THEME } from '../components/theme';

import RootStore from './root-store';
import BrowserHistoryStore from './browser-history-store';
import { IRootStore } from './interfaces';

export const StoreContext = createContext<IRootStore>({} as IRootStore);
export const StoreProvider = StoreContext.Provider;

// eslint-disable-next-line react/prop-types
export const RootStoreProvider = (props: any) => {
  const [DEVICE_THEME, setTheme] = useState<ITheme>(LIGHT_THEME);
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(max-width:1000px)');
  const { themeType } = useDarkThemeContext();
  console.log('RootStoreProvider');
  BrowserHistoryStore.historyRouter = useHistory();
  RootStore.init();
  console.log('props.children', props.children);

  useEffect(() => {
    const theme = themeType === 'light' ? LIGHT_THEME : DARK_THEME;
    setTheme({
      ...theme,
      isTablet,
      isMobile,
    });
  }, [isTablet, isMobile, themeType]);

  return (
    <StoreProvider value={RootStore}>
      <ThemeProvider theme={DEVICE_THEME}>{props.children}</ThemeProvider>
    </StoreProvider>
  );
};
