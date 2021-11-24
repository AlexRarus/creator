import 'proxy-polyfill';
import 'react-app-polyfill/stable';
import React, { useState, useEffect } from 'react';
import * as mobx from 'mobx';
import { RootStoreProvider } from 'src/dal/store-provider';
import { ThemeProvider } from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';

/*
*   const isMobile = useMediaQuery('(max-width:768px)');
    const isTablet = useMediaQuery('(max-width:1000px)');
* */

mobx.configure({
  enforceActions: 'observed',
});

window['__localeId__'] = 'ru';

export const AppCommonProvider = (props: any) => {
  const { children } = props;
  const [DEVICE_THEME, setTheme] = useState({ isTablet: false, isMobile: false });
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(max-width:1000px)');

  useEffect(() => {
    setTheme({
      isTablet,
      isMobile,
    });
  }, [isTablet, isMobile]);

  return (
    <RootStoreProvider>
      <ThemeProvider theme={DEVICE_THEME}>{children}</ThemeProvider>
    </RootStoreProvider>
  );
};
