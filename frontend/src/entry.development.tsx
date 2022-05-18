import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StaticContextProvider } from 'src/providers/static-context-provider';

import Root from './root';
import './i18n';
import { AppCommonProvider } from './providers';

ReactDOM.render(
  <BrowserRouter>
    <StaticContextProvider context={null}>
      <AppCommonProvider>
        <Root />
      </AppCommonProvider>
    </StaticContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
