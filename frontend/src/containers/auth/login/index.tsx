import React from 'react';
import { AuthLayout } from 'src/apps/auth-app/layout';

import { LoginPageContainer } from './container';

const LoginPage = (props: any) => {
  return (
    <AuthLayout>
      <LoginPageContainer {...props} />
    </AuthLayout>
  );
};

export default LoginPage;
