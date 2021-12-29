import 'proxy-polyfill';
import 'react-app-polyfill/stable';
import React from 'react';
import * as mobx from 'mobx';
import { RootStoreProvider } from 'src/dal/store-provider';

import { CustomThemeProvider } from './dark-theme-provider';
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

window['__localeId__'] = 'ru';

export const AppCommonProvider = (props: any) => {
  const { children } = props;

  return (
    <CustomThemeProvider>
      <VirtualKeyboardProvider>
        <AppTypeProvider>
          <HackDndProvider>
            <RootStoreProvider>{children}</RootStoreProvider>
          </HackDndProvider>
        </AppTypeProvider>
      </VirtualKeyboardProvider>
    </CustomThemeProvider>
  );
};
