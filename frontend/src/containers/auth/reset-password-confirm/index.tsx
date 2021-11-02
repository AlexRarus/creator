import React from 'react';
import RootStore from 'src/dal/root-store';

import { ResetPasswordConfirmPageContainer } from './container';
import { ResetPasswordConfirmStore } from './store';

export const store = new ResetPasswordConfirmStore(RootStore);

const ResetPasswordConfirmPage = (props: any) => {
  return <ResetPasswordConfirmPageContainer {...props} />;
};

export default ResetPasswordConfirmPage;
