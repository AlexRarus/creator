import 'proxy-polyfill';
import 'react-app-polyfill/stable';
import React from 'react';
import * as mobx from 'mobx';
import { RootStoreProvider } from 'src/dal/store-provider';
import { isBrowser } from 'src/utils/detectEnvironment';

import { MainThemeProvider } from './main-theme-provider';
import { AppTypeProvider } from './app-type-provider';
import { VirtualKeyboardProvider } from './virtual-keyboard-provider';
import { HackDndProvider } from './hack-dnd-provider';

/*
    const isMobile = useMediaQuery('(max-width:768px)');
    const isTablet = useMediaQuery('(max-width:1000px)');
* */

mobx.configure({
  enforceActions: 'observed',
});

// todo ssr костыль
if (isBrowser) {
  window['__localeId__'] = 'ru';
}

export const AppCommonProvider = (props: any) => {
  const { children } = props;

  return (
    <MainThemeProvider>
      <VirtualKeyboardProvider>
        <AppTypeProvider>
          <HackDndProvider>
            <RootStoreProvider>{children}</RootStoreProvider>
          </HackDndProvider>
        </AppTypeProvider>
      </VirtualKeyboardProvider>
    </MainThemeProvider>
  );
};
