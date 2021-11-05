import React from 'react';
import RootStore from 'src/dal/root-store';

import { PagesItemPageContainer } from './container';
import { PagesItemStore } from './store';

export const store = new PagesItemStore(RootStore);

const PagesItemPage = (props: any) => {
  return <PagesItemPageContainer {...props} />;
};

export default PagesItemPage;
