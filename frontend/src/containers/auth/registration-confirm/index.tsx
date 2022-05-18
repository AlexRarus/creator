import React from 'react';
import { AuthLayout } from 'src/apps/auth-app/layout';

import { RegistrationConfirmPageContainer } from './container';

const RegistrationConfirmPage = (props: any) => {
  return (
    <AuthLayout>
      <RegistrationConfirmPageContainer {...props} />
    </AuthLayout>
  );
};

export default RegistrationConfirmPage;
