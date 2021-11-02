import React from 'react';
import RootStore from 'src/dal/root-store';

import { MainPageContainer } from './container';
import { MainPageStore } from './store';

export const store = new MainPageStore(RootStore);

const MainPage = (props: any) => {
  return <MainPageContainer {...props} />;
};

export default MainPage;
