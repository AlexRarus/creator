import React from 'react';
import RootStore from 'src/dal/root-store';

import { RegistrationPageContainer } from './container';
import { RegistrationPageStore } from './store';

export const store = new RegistrationPageStore(RootStore);

const RegistrationPage = (props: any) => {
  return <RegistrationPageContainer {...props} />;
};

export default RegistrationPage;
