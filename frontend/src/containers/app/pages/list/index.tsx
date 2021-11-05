import React from 'react';
import RootStore from 'src/dal/root-store';

import { PagesListPageContainer } from './container';
import { PagesListStore } from './store';

export const store = new PagesListStore(RootStore);

const PagesListPage = (props: any) => {
  return <PagesListPageContainer {...props} />;
};

export default PagesListPage;
