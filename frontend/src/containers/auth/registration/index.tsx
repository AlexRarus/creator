import React from 'react';
import { AuthLayout } from 'src/apps/auth-app/layout';

import { RegistrationPageContainer } from './container';

const RegistrationPage = (props: any) => {
  return (
    <AuthLayout>
      <RegistrationPageContainer {...props} />
    </AuthLayout>
  );
};

export default RegistrationPage;
