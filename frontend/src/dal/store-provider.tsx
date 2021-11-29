import React, { createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useThemeContext } from 'src/providers/dark-theme-provider';
import { ThemeProvider } from 'styled-components';

import RootStore from './root-store';
import BrowserHistoryStore from './browser-history-store';
import { IRootStore } from './interfaces';

export const StoreContext = createContext<IRootStore>({} as IRootStore);
export const StoreProvider = StoreContext.Provider;

// eslint-disable-next-line react/prop-types
export const RootStoreProvider = (props: any) => {
  const { DEVICE_THEME } = useThemeContext();
  BrowserHistoryStore.historyRouter = useHistory();
  RootStore.init();

  return (
    <StoreProvider value={RootStore}>
      <ThemeProvider theme={DEVICE_THEME}>{props.children}</ThemeProvider>
    </StoreProvider>
  );
};
