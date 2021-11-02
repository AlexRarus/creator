import React from 'react';
import RootStore from 'src/dal/root-store';

import { RegistrationConfirmPageContainer } from './container';
import { RegistrationConfirmPageStore } from './store';

export const store = new RegistrationConfirmPageStore(RootStore);

const RegistrationConfirmPage = (props: any) => {
  return <RegistrationConfirmPageContainer {...props} />;
};

export default RegistrationConfirmPage;
