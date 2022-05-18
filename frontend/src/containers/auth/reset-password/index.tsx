import React from 'react';
import { AuthLayout } from 'src/apps/auth-app/layout';

import { ResetPasswordPageContainer } from './container';

const ResetPasswordPage = (props: any) => {
  return (
    <AuthLayout>
      <ResetPasswordPageContainer {...props} />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
