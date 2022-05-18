import React from 'react';
import { observer } from 'mobx-react';
// todo swiper v7 не поддерживает SSR
// Direct React component imports
// import { Swiper, SwiperSlide } from 'swiper/react'; // import Swiper core and required modules
// import SwiperCore, { Autoplay, Pagination, Navigation, EffectCards } from 'swiper';
// Import Swiper styles
// import 'swiper/css/bundle';

import {
  // ScreenImage,
  SwiperWrapper,
} from './style';
// import MobilePhone from './assets/test-image.jpg';
// import MobilePhone1 from './assets/test-image1.jpg';
// import MobilePhone2 from './assets/test-image2.jpeg';
// import MobilePhone3 from './assets/test-image3.jpeg';
// import MobilePhone4 from './assets/test-image4.jpeg';

// const carouselList = [
//   {
//     main: MobilePhone,
//     second: MobilePhone1,
//   },
//   {
//     main: MobilePhone2,
//     second: MobilePhone3,
//   },
//   {
//     main: MobilePhone3,
//     second: MobilePhone4,
//   },
//   {
//     main: MobilePhone4,
//     second: MobilePhone,
//   },
// ];

// install Swiper modules
// SwiperCore.use([Autoplay, Pagination, Navigation, EffectCards]);

export const PhoneSwiper = observer(() => {
  return (
    <SwiperWrapper width={340}>
      {/*<Swiper*/}
      {/*  effect={'cards'}*/}
      {/*  cardsEffect={{ slideShadows: false }}*/}
      {/*  centeredSlides={true}*/}
      {/*  autoplay={{*/}
      {/*    delay: 6000,*/}
      {/*    disableOnInteraction: false,*/}
      {/*  }}*/}
      {/*  pagination={{*/}
      {/*    clickable: true,*/}
      {/*  }}>*/}
      {/*  {carouselList.map((pair, index) => (*/}
      {/*    <SwiperSlide key={index}>*/}
      {/*      <ScreenImage imageUrl={pair.second} width={300} />*/}
      {/*    </SwiperSlide>*/}
      {/*  ))}*/}
      {/*</Swiper>*/}
    </SwiperWrapper>
  );
});
