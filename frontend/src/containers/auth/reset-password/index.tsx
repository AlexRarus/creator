import React from 'react';
import RootStore from 'src/dal/root-store';

import { ResetPasswordPageContainer } from './container';
import { ResetPasswordPageStore } from './store';

export const store = new ResetPasswordPageStore(RootStore);

const ResetPasswordPage = (props: any) => {
  return <ResetPasswordPageContainer {...props} />;
};

export default ResetPasswordPage;
