import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Root from './root';
import './i18n';
import { AppCommonProvider } from './providers';

ReactDOM.hydrate(
  <BrowserRouter>
    <AppCommonProvider>
      <Root />
    </AppCommonProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
