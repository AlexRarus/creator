import React from 'react';
import RootStore from 'src/dal/root-store';

import { BlocksFormContainer } from './container';
import { BlocksFormStore } from './store';

export const store = new BlocksFormStore(RootStore);

const BlocksForm = (props: any) => {
  return <BlocksFormContainer {...props} />;
};

export default BlocksForm;
