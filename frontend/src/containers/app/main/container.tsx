import React from 'react';
import { observer } from 'mobx-react';

import { MainPageWrapper } from './style';
import { MainPageMenu } from './menu';
import { LandingContainer } from './landing';

export const MainPageContainer = observer(() => {
  return (
    <>
      <MainPageMenu />
      <MainPageWrapper>
        <LandingContainer />
      </MainPageWrapper>
    </>
  );
});
