import 'proxy-polyfill';
import 'react-app-polyfill/stable';
import React from 'react';
import * as mobx from 'mobx';
import { RootStoreProvider } from 'src/dal/store-provider';

import { DarkThemeProvider } from './dark-theme-provider';

/*
    const isMobile = useMediaQuery('(max-width:768px)');
    const isTablet = useMediaQuery('(max-width:1000px)');
* */

mobx.configure({
  enforceActions: 'observed',
});

window['__localeId__'] = 'ru';

export const AppCommonProvider = (props: any) => {
  const { children } = props;

  return (
    <DarkThemeProvider>
      <RootStoreProvider>{children}</RootStoreProvider>
    </DarkThemeProvider>
  );
};
