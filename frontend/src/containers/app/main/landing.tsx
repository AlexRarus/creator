import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import InputText from 'src/components/input-text';
import Button from 'src/components/button';
import { COLORS } from 'src/components/theme';
import Category from '@mui/icons-material/Category';
import Facebook from '@mui/icons-material/Facebook';
import YouTube from '@mui/icons-material/YouTube';
import Instagram from '@mui/icons-material/Instagram';
import { ControlledField } from 'src/components/controlled-field';
import { Grid, GridColumn } from 'src/components/grid';

import { BlockSwiper } from './block-swiper';
import { PhoneSwiper } from './phone-swiper';
import {
  LandingWrapper,
  LandingPart,
  WelcomeTitle,
  WelcomeSpan,
  StartRow,
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
  // ScreensList,
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
  LeftExample,
  RightExample,
} from './style';
import MobilePhone from './assets/test-image.jpg';
import MobilePhone2 from './assets/test-image2.jpeg';
import MobilePhone3 from './assets/test-image3.jpeg';
import MobilePhone4 from './assets/test-image4.jpeg';
import { useInterval } from './hooks';

const carouselAllowList = [MobilePhone, MobilePhone2, MobilePhone3, MobilePhone4];

type FormInputs = {
  email: string;
};

export const LandingContainer = observer(() => {
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

  const { watch, control } = useForm<FormInputs>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const username = watch('email');

  const onAllowClick = (nextAllow: number) => () => {
    // обавляем 1 милисекунду к интервалу чтобы запустить его заново
    setMilliseconds(milliseconds + 1);
    setSelectedAllow(nextAllow);
  };

  const history = useHistory();

  const onClickStart = () => {
    history.push(`auth/registration?email=${username}`);
  };

  return (
    <LandingWrapper>
      <BlockSwiper />
      <LandingPart padding={{ top: '24px', bottom: '24px', left: '24px', right: '24px' }}>
        <Grid
          // alignItems="end" колонки будут выравнены по правому краю
          gap={24}
          verticalGap={32}
          // staticSize={6} если передать то пересчета размеров для разных breakPoints НЕ БУДЕТ
          breakPoints={{
            // все переданные здесь значения выставлены по-умолчанию
            // можно передать через контекст ThemeProvider theme: { gridBreakPoints: {...} }
            '320px': 6, // 4 колонки при ширине экрана 320 и меньше
            '530px': 6, // 6 колонок при ширине экрана 530 и меньше
            '950px': 8, // 8 колонок при ширине экрана 950 и меньше
            '1024px': 12, // 10 колонок при ширине экрана 1024 и меньше
            '1280px': 12, // 12 колонок при ширине экрана 1280 и меньше
          }}>
          <GridColumn size={6}>
            <LeftExample>
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
                Позвольте клиенту выбрать удобный способ связи с вами и оплатить товары и услуги
                прямо в Инстаграм.
              </ExamplesContent>
              <Button dimension={'xxl'} kind={'air'} onClick={onClickStart}>
                Попробовать сейчас
              </Button>
            </LeftExample>
          </GridColumn>
          <GridColumn size={6}>
            <RightExample>
              <PhoneSwiper />
            </RightExample>
          </GridColumn>
        </Grid>
      </LandingPart>
      <AllowPart background={COLORS.blue[700]}>
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
          <ControlledField name='email' control={control}>
            <InputText placeholder={'Ваш email'} kind={'air'} dimension={'xxl'} />
          </ControlledField>
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
