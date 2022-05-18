import React from 'react';
import { AuthLayout } from 'src/apps/auth-app/layout';

import { MessagePageContainer } from './container';

const MessagePage = (props: any) => {
  return (
    <AuthLayout>
      <MessagePageContainer {...props} />
    </AuthLayout>
  );
};

export default MessagePage;
