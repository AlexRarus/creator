import React, { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from 'src/providers/main-theme-provider';
import { ThemeProvider } from 'styled-components';

import RootStore from './root-store';
import BrowserHistoryStore from './browser-history-store';
import { IRootStore } from './interfaces';

export const StoreContext = createContext<IRootStore>({} as IRootStore);
export const StoreProvider = StoreContext.Provider;

export const RootStoreProvider = (props: any) => {
  const { DEVICE_THEME } = useThemeContext();
  BrowserHistoryStore.navigateMethod = useNavigate();
  RootStore.init();

  return (
    <StoreProvider value={RootStore}>
      <ThemeProvider theme={DEVICE_THEME}>{props.children}</ThemeProvider>
    </StoreProvider>
  );
};
