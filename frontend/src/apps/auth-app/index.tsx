import React from 'react';
import Router from 'src/router';
import routes from 'src/router/routes/auth-routes';

import { AuthLayout } from './layout';

const AuthApp = () => {
  return (
    <AuthLayout>
      <Router routes={routes} />
    </AuthLayout>
  );
};

export default AuthApp;
