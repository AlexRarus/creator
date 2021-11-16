import React from 'react';
import RootStore from 'src/dal/root-store';

import { PagesFormContainer } from './container';
import { PagesFormStore } from './store';

export const store = new PagesFormStore(RootStore);

const PagesForm = (props: any) => {
  return <PagesFormContainer {...props} />;
};

export default PagesForm;
