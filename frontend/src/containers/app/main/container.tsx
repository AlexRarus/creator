import React, { useState } from 'react';
import { observer } from 'mobx-react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from 'react-router-dom';
import InputText from 'src/components/input-text';
import Button from 'src/components/button';
// import { Link } from 'react-router-dom';
// import { Grid, GridColumn } from 'src/components/grid';
// import Button from 'src/components/button';

// import { useMapStoreToProps } from './selectors';
import { MainPageWrapper, LandingWrapper, WelcomeTitle, WelcomeSpan, StartRow } from './style';
import { MainPageMenu } from './menu';

export const MainPageContainer = observer(() => {
  const [emailValue, setEmailValue] = useState('');
  const history = useHistory();
  const isMobileWidth = useMediaQuery('(max-width:768px)');
  // const { user, logoutAction } = useMapStoreToProps();

  const onClickStart = () => {
    history.push(`auth/registration?email=${emailValue}`);
  };

  return (
    <>
      <MainPageMenu />
      <MainPageWrapper>
        <LandingWrapper>
          <WelcomeTitle>Расширяйте возможности вашего профиля</WelcomeTitle>
          <WelcomeSpan>в TikTok и других соцсетях</WelcomeSpan>
          <StartRow isMobile={isMobileWidth}>
            <InputText
              value={emailValue}
              onChange={setEmailValue}
              placeholder={'Ваш email'}
              type={'air'}
              dimension={'xxl'}
            />
            <Button dimension={'xxl'} kind={'air'} onClick={onClickStart}>
              Начать бесплатно
            </Button>
          </StartRow>
        </LandingWrapper>
      </MainPageWrapper>
    </>
  );
});
