import React from 'react';
import RootStore from 'src/dal/root-store';

import { LoginPageContainer } from './container';
import { LoginPageStore } from './store';

export const store = new LoginPageStore(RootStore);

const LoginPage = (props: any) => {
  return <LoginPageContainer {...props} />;
};

export default LoginPage;
