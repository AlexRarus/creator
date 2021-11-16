import React from 'react';
// import RootStore from 'src/dal/root-store';

import { BlocksTypesContainer } from './container';
// import { BlocksTypesStore } from './store';

// export const store = new BlocksTypesStore(RootStore);

const BlocksTypes = (props: any) => {
  return <BlocksTypesContainer {...props} />;
};

export default BlocksTypes;
