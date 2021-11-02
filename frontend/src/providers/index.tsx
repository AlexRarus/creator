import 'proxy-polyfill';
import 'react-app-polyfill/stable';
import React from 'react';
import * as mobx from 'mobx';
import { RootStoreProvider } from 'src/dal/store-provider';

mobx.configure({
  enforceActions: 'observed',
});

window['__localeId__'] = 'ru';

export const AppCommonProvider = (props: any) => {
  const { children } = props;

  return <RootStoreProvider>{children}</RootStoreProvider>;
};
