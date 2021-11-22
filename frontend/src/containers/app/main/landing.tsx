import React, { useState } from 'react';
import { observer } from 'mobx-react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from 'react-router-dom';
import InputText from 'src/components/input-text';
import Button from 'src/components/button';
import { COLORS } from 'src/components/theme';
import Category from '@material-ui/icons/Category';

import {
  LandingWrapper,
  LandingPart,
  WelcomeTitle,
  WelcomeSpan,
  StartRow,
  ScreenOfPhone,
  SecondScreen,
  LandingExamplesBlock,
  ExamplesLinks,
  ExampleLink,
  ExamplesHeader,
  HeaderIconBox,
  ExamplesSeparate,
  ExamplesContent,
} from './style';

export const LandingContainer = observer(() => {
  const [emailValue, setEmailValue] = useState('');
  const history = useHistory();
  const isMobileWidth = useMediaQuery('(max-width:1000px)');

  const onClickStart = () => {
    history.push(`auth/registration?email=${emailValue}`);
  };

  return (
    <LandingWrapper>
      <LandingPart background={COLORS.deepPurple[800]}>
        <WelcomeTitle isLight={true}>Расширяйте возможности вашего профиля</WelcomeTitle>
        <WelcomeSpan isLight={true}>в TikTok и других соцсетях</WelcomeSpan>
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
      </LandingPart>
      <LandingPart padding={{ top: '100px', bottom: '100px', left: '24px', right: '24px' }}>
        <LandingExamplesBlock isMobile={isMobileWidth}>
          <ExamplesLinks>
            <ExampleLink>товары</ExampleLink>
            <ExampleLink>услуги</ExampleLink>
            <ExampleLink>обучение</ExampleLink>
            <ExampleLink>мероприятия</ExampleLink>
          </ExamplesLinks>
          <ExamplesHeader>
            <HeaderIconBox>
              <Category htmlColor={COLORS.deepPurple[500]} />
            </HeaderIconBox>
            Получайте больше обращений и продаж через Инстаграм
          </ExamplesHeader>
          <ExamplesSeparate />
          <ExamplesContent>
            Позвольте клиенту выбрать удобный способ связи с вами и оплатить товары и услуги прямо в
            Инстаграм.
          </ExamplesContent>
          <Button dimension={'xxl'} kind={'air'} onClick={onClickStart}>
            Попробовать сейчас
          </Button>
        </LandingExamplesBlock>
        <SecondScreen isMobile={isMobileWidth} />
        <ScreenOfPhone isMobile={isMobileWidth} />
      </LandingPart>
      <LandingPart background={COLORS.teal[100]}>
        <WelcomeTitle>Увеличьте возможности вашего профиля в Инстаграм прямо сейчас</WelcomeTitle>
        <WelcomeSpan>
          Создайте YourSite за несколько минут. Без дизайнеров и программистов.
        </WelcomeSpan>
        <StartRow isMobile={isMobileWidth}>
          <InputText
            value={emailValue}
            onChange={setEmailValue}
            placeholder={'Ваш email'}
            type={'air'}
            dimension={'xxl'}
          />
          <Button dimension={'xxl'} kind={'air'} onClick={onClickStart}>
            Создать YourSite
          </Button>
        </StartRow>
      </LandingPart>
    </LandingWrapper>
  );
});
