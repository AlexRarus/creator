import React, { useState } from 'react';
import { observer } from 'mobx-react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from 'react-router-dom';
import InputText from 'src/components/input-text';
import Button from 'src/components/button';
import { COLORS } from 'src/components/theme';
import Category from '@material-ui/icons/Category';
import Facebook from '@material-ui/icons/Facebook';
import YouTube from '@material-ui/icons/YouTube';
import Instagram from '@material-ui/icons/Instagram';

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
  LandingFooter,
  FooterItem,
  ItemHeader,
  ItemRow,
  LangRow,
  Flag,
  FooterIconBox,
  ScreensList,
  ScreenImage,
  ScreenImage1,
} from './style';

export const LandingContainer = observer(() => {
  const [emailValue, setEmailValue] = useState('');
  const [carouselOrder, setOrder] = useState(0);

  const history = useHistory();
  const isMobileWidth = useMediaQuery('(max-width:1000px)');

  const onClickStart = () => {
    history.push(`auth/registration?email=${emailValue}`);
  };

  const setCarousel = (order: number) => () => {
    setOrder(order);
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
            <ExampleLink onClick={setCarousel(0)}>товары</ExampleLink>
            <ExampleLink onClick={setCarousel(1)}>услуги</ExampleLink>
            <ExampleLink onClick={setCarousel(0)}>обучение</ExampleLink>
            <ExampleLink onClick={setCarousel(1)}>мероприятия</ExampleLink>
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
        <SecondScreen width={230} isMobile={isMobileWidth}>
          <ScreensList isMobile={isMobileWidth} width={230} order={carouselOrder} length={2}>
            <ScreenImage1 isMobile={isMobileWidth} width={230} />
            <ScreenImage isMobile={isMobileWidth} width={230} />
          </ScreensList>
        </SecondScreen>
        <ScreenOfPhone width={280} isMobile={isMobileWidth}>
          <ScreensList isMobile={isMobileWidth} width={280} order={carouselOrder} length={2}>
            <ScreenImage isMobile={isMobileWidth} width={280} />
            <ScreenImage1 isMobile={isMobileWidth} width={280} />
          </ScreensList>
        </ScreenOfPhone>
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
      <LandingFooter>
        <FooterItem>
          <ItemHeader>Информация</ItemHeader>
          <ItemRow>Политика конфиденциальности</ItemRow>
          <ItemRow>Договор-оферта</ItemRow>
          <ItemRow>Цены и тарифы</ItemRow>
        </FooterItem>
        <FooterItem>
          <ItemHeader>Поддержка</ItemHeader>
          <ItemRow>Задать вопрос</ItemRow>
          <ItemRow>Канал в Telegram</ItemRow>
          <ItemRow>Отзывы и предложения</ItemRow>
        </FooterItem>
        <FooterItem>
          <ItemHeader>Помощь</ItemHeader>
          <ItemRow>Подробные инструкции</ItemRow>
          <ItemRow>Вопросы и ответы</ItemRow>
          <ItemRow>Блог</ItemRow>
        </FooterItem>
        <FooterItem>
          <LangRow>
            <Flag>&#127479;&#127482;</Flag>
            Русский
          </LangRow>
          <ItemRow>
            <FooterIconBox>
              <Facebook />
            </FooterIconBox>
            <FooterIconBox>
              <YouTube />
            </FooterIconBox>
            <FooterIconBox>
              <Instagram />
            </FooterIconBox>
            <FooterIconBox>
              <Facebook />
            </FooterIconBox>
          </ItemRow>
          <ItemRow>YourSite, 2021-2051</ItemRow>
        </FooterItem>
      </LandingFooter>
    </LandingWrapper>
  );
});
