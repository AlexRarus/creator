import React, { useState } from 'react';
import { observer } from 'mobx-react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router-dom';
import InputText from 'src/components/input-text';
import Button from 'src/components/button';
import { COLORS } from 'src/components/theme';
import Category from '@mui/icons-material/Category';
import Facebook from '@mui/icons-material/Facebook';
import YouTube from '@mui/icons-material/YouTube';
import Instagram from '@mui/icons-material/Instagram';

import {
  LandingWrapper,
  LandingPart,
  WelcomeTitle,
  WelcomeSpan,
  StartRow,
  ScreenOfPhone,
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
  AllowMobileHeader,
  AllowPart,
  Allows,
  AllowBlock,
  AllowList,
  AllowRow,
  AllowHeader,
  AllowIndicatorBox,
  AllowScreensList,
  AllowScreen,
} from './style';
import MobilePhone from './assets/test-image.jpg';
import MobilePhone1 from './assets/test-image1.jpg';
import MobilePhone2 from './assets/test-image2.jpeg';
import MobilePhone3 from './assets/test-image3.jpeg';
import MobilePhone4 from './assets/test-image4.jpeg';
import { useInterval } from './hooks';

const carouselList = [
  {
    main: MobilePhone,
    second: MobilePhone1,
  },
  {
    main: MobilePhone2,
    second: MobilePhone3,
  },
  {
    main: MobilePhone3,
    second: MobilePhone4,
  },
  {
    main: MobilePhone4,
    second: MobilePhone,
  },
];

const carouselAllowList = [MobilePhone, MobilePhone2, MobilePhone3, MobilePhone4];

export const LandingContainer = observer(() => {
  const [emailValue, setEmailValue] = useState('');
  const [carouselOrder, setOrder] = useState(0);
  const [milliseconds, setMilliseconds] = useState(60000); // 1 min;
  const [selectedAllow, setSelectedAllow] = useState(0);
  // set interval для смены слайдов блока allows
  useInterval(() => {
    if (selectedAllow < 3) {
      setSelectedAllow(selectedAllow + 1);
    } else {
      setSelectedAllow(0);
    }
  }, milliseconds / 12); // 5 sec

  // set interval для смены слайдов блока examples
  useInterval(() => {
    if (carouselOrder < 3) {
      setOrder(carouselOrder + 1);
    } else {
      setOrder(0);
    }
  }, milliseconds / 10); // 6 sec

  const onAllowClick = (nextAllow: number) => () => {
    // обавляем 1 милисекунду к интервалу чтобы запустить его заново
    setMilliseconds(milliseconds + 1);
    setSelectedAllow(nextAllow);
  };

  const history = useHistory();

  const onClickStart = () => {
    history.push(`auth/registration?email=${emailValue}`);
  };

  const setCarousel = (order: number) => () => {
    // обавляем 1 милисекунду к интервалу чтобы запустить его заново
    setMilliseconds(milliseconds + 1);
    setOrder(order);
  };

  return (
    <LandingWrapper>
      <LandingPart background={COLORS.deepPurple[800]}>
        <WelcomeTitle isLight={true}>Расширяйте возможности вашего профиля</WelcomeTitle>
        <WelcomeSpan isLight={true}>в TikTok и других соцсетях</WelcomeSpan>
        <StartRow>
          <InputText
            value={emailValue}
            onChange={setEmailValue}
            placeholder={'Ваш email'}
            kind={'air'}
            dimension={'xxl'}
          />
          <Button dimension={'xxl'} kind={'air'} onClick={onClickStart}>
            Начать бесплатно
          </Button>
        </StartRow>
      </LandingPart>
      <LandingPart padding={{ top: '100px', bottom: '100px', left: '24px', right: '24px' }}>
        <LandingExamplesBlock>
          <ExamplesLinks>
            <ExampleLink isSelected={carouselOrder === 0} onClick={setCarousel(0)}>
              товары
            </ExampleLink>
            <ExampleLink isSelected={carouselOrder === 1} onClick={setCarousel(1)}>
              услуги
            </ExampleLink>
            <ExampleLink isSelected={carouselOrder === 2} onClick={setCarousel(2)}>
              обучение
            </ExampleLink>
            <ExampleLink isSelected={carouselOrder === 3} onClick={setCarousel(3)}>
              мероприятия
            </ExampleLink>
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
        <ScreenOfPhone width={230}>
          <ScreensList width={230} order={carouselOrder} length={carouselList.length}>
            {carouselList.map((pair, index) => (
              <ScreenImage key={index} imageUrl={pair.second} width={230} />
            ))}
          </ScreensList>
        </ScreenOfPhone>
        <ScreenOfPhone screenOrder={1} width={280}>
          <ScreensList width={280} order={carouselOrder} length={carouselList.length}>
            {carouselList.map((pair, index) => (
              <ScreenImage key={index} imageUrl={pair.main} width={280} />
            ))}
          </ScreensList>
        </ScreenOfPhone>
      </LandingPart>
      <AllowPart background={COLORS.blue[500]}>
        <Allows>
          <AllowBlock>
            <AllowMobileHeader>YourSite позволяет</AllowMobileHeader>
            <AllowScreen width={250}>
              <AllowScreensList width={250} order={selectedAllow} length={carouselAllowList.length}>
                {carouselAllowList.map((image, index) => (
                  <ScreenImage key={index} imageUrl={image} width={250} />
                ))}
              </AllowScreensList>
            </AllowScreen>
          </AllowBlock>
          <AllowBlock>
            <AllowList>
              <AllowHeader>YourSite позволяет</AllowHeader>
              <AllowRow onClick={onAllowClick(0)} isSelected={selectedAllow === 0}>
                <AllowIndicatorBox isSelected={selectedAllow === 0} />
                Рассказать больше о вас и вашем продукте
              </AllowRow>
              <AllowRow onClick={onAllowClick(1)} isSelected={selectedAllow === 1}>
                <AllowIndicatorBox isSelected={selectedAllow === 1} />
                Увеличить продажи
              </AllowRow>
              <AllowRow onClick={onAllowClick(2)} isSelected={selectedAllow === 2}>
                <AllowIndicatorBox isSelected={selectedAllow === 2} />
                Связаться с вами в один клик
              </AllowRow>
              <AllowRow onClick={onAllowClick(3)} isSelected={selectedAllow === 3}>
                <AllowIndicatorBox isSelected={selectedAllow === 3} />
                Принимать заказы и оплаты онлайн
              </AllowRow>
            </AllowList>
          </AllowBlock>
        </Allows>
      </AllowPart>
      <LandingPart background={COLORS.teal[100]}>
        <WelcomeTitle>Увеличьте возможности вашего профиля в Инстаграм прямо сейчас</WelcomeTitle>
        <WelcomeSpan>
          Создайте YourSite за несколько минут. Без дизайнеров и программистов.
        </WelcomeSpan>
        <StartRow>
          <InputText
            value={emailValue}
            onChange={setEmailValue}
            placeholder={'Ваш email'}
            kind={'air'}
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
