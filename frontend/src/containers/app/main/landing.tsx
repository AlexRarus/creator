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
  }, milliseconds / 10); // 1 sec

  const onAllowClick = (nextAllow: number) => () => {
    // обавляем 1 милисекунду к интервалу чтобы запустить его заново
    setMilliseconds(milliseconds + 1);
    setSelectedAllow(nextAllow);
  };

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
            <ExampleLink onClick={setCarousel(2)}>обучение</ExampleLink>
            <ExampleLink onClick={setCarousel(3)}>мероприятия</ExampleLink>
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
        <ScreenOfPhone width={230} right={224} bottom={isMobileWidth ? 220 : -100}>
          <ScreensList
            isMobile={isMobileWidth}
            width={230}
            order={carouselOrder}
            length={carouselList.length}>
            {carouselList.map((pair, index) => (
              <ScreenImage
                key={index}
                imageUrl={pair.second}
                isMobile={isMobileWidth}
                width={230}
              />
            ))}
          </ScreensList>
        </ScreenOfPhone>
        <ScreenOfPhone
          width={280}
          right={isMobileWidth ? 14 : 40}
          bottom={isMobileWidth ? 140 : -40}>
          <ScreensList
            isMobile={isMobileWidth}
            width={280}
            order={carouselOrder}
            length={carouselList.length}>
            {carouselList.map((pair, index) => (
              <ScreenImage key={index} imageUrl={pair.main} isMobile={isMobileWidth} width={280} />
            ))}
          </ScreensList>
        </ScreenOfPhone>
      </LandingPart>
      <LandingPart
        background={COLORS.blue[500]}
        padding={{ top: '120px', bottom: '24px', left: '24px', right: '24px' }}>
        <Allows>
          <AllowBlock>
            <AllowScreen width={250}>
              <AllowScreensList
                isMobile={isMobileWidth}
                width={250}
                order={selectedAllow}
                length={carouselList.length}>
                {carouselList.map((pair, index) => (
                  <ScreenImage
                    key={index}
                    imageUrl={pair.second}
                    isMobile={isMobileWidth}
                    width={250}
                  />
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
