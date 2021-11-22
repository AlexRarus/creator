import React from 'react';
import { observer } from 'mobx-react';
import { Menu } from 'src/components/menu';

import { MainPageWrapper } from './style';
import { LandingContainer } from './landing';

export const MainPageContainer = observer(() => {
  return (
    <>
      <Menu isProfile={false} />
      <MainPageWrapper>
        <LandingContainer />
      </MainPageWrapper>
    </>
  );
});
