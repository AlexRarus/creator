import React from 'react';
import { AuthLayout } from 'src/apps/auth-app/layout';

import { ResetPasswordConfirmPageContainer } from './container';

const ResetPasswordConfirmPage = (props: any) => {
  return (
    <AuthLayout>
      <ResetPasswordConfirmPageContainer {...props} />
    </AuthLayout>
  );
};

export default ResetPasswordConfirmPage;
