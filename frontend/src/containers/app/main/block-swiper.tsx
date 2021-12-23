import React from 'react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import InputText from 'src/components/input-text';
import Button from 'src/components/button';
import { COLORS } from 'src/components/theme';
import { ControlledField } from 'src/components/controlled-field';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react'; // import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css/bundle';

import { LandingPart, WelcomeTitle, WelcomeSpan, StartRow, SwiperWrapper } from './style';

const swiperList = [
  {
    background: COLORS.deepPurple[800],
    title: 'Расширяйте возможности вашего профиля',
    text: 'в TikTok и других соцсетях',
  },
  {
    background: COLORS.yellow[700],
    title: 'Расширяйте возможности вашего профиля',
    text: 'в Instagram и других соцсетях',
  },
  {
    background: COLORS.brown[500],
    title: 'Расширяйте возможности вашего профиля',
    text: 'в VK и других соцсетях',
  },
  {
    background: COLORS.green[600],
    title: 'Расширяйте возможности вашего профиля',
    text: 'в Facebook и других соцсетях',
  },
  {
    background: COLORS.pink[600],
    title: 'Расширяйте возможности вашего профиля',
    text: 'в Youtube и других соцсетях',
  },
];

type FormInputs = {
  email: string;
};

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

export const BlockSwiper = observer(() => {
  const { watch, control } = useForm<FormInputs>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const username = watch('email');

  const history = useHistory();

  const onClickStart = () => {
    history.push(`auth/registration?email=${username}`);
  };

  return (
    <SwiperWrapper width={window.innerWidth}>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}>
        {swiperList.map((item, index) => (
          <SwiperSlide key={index}>
            <LandingPart background={item.background}>
              <WelcomeTitle isLight={true}>{item.title}</WelcomeTitle>
              <WelcomeSpan isLight={true}>{item.text}</WelcomeSpan>
              <StartRow>
                <ControlledField name='email' control={control}>
                  <InputText placeholder={'Ваш email'} kind={'air'} dimension={'xxl'} />
                </ControlledField>
                <Button dimension={'xxl'} kind={'air'} onClick={onClickStart}>
                  Начать бесплатно
                </Button>
              </StartRow>
            </LandingPart>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperWrapper>
  );
});
