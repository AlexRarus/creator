import React from 'react';

import { StoreContext } from './store-provider';
// import RootStore from './root-store';
import { IRootStore } from './interfaces';

/*
  v1
  Usable ❌
  We still have to wrap our code with useObserver everytime we use this hook.
*/
export const useStores = (): IRootStore => React.useContext(StoreContext);
