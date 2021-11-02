import React, { createContext } from 'react';
import { useHistory } from 'react-router-dom';

import RootStore from './root-store';
import BrowserHistoryStore from './browser-history-store';
import { IRootStore } from './interfaces';

export const StoreContext = createContext<IRootStore>({} as IRootStore);
export const StoreProvider = StoreContext.Provider;

// eslint-disable-next-line react/prop-types
export const RootStoreProvider = (props: any) => {
  console.log('RootStoreProvider');
  BrowserHistoryStore.historyRouter = useHistory();
  RootStore.init();
  console.log('props.children', props.children);
  return <StoreProvider value={RootStore}>{props.children}</StoreProvider>;
};
