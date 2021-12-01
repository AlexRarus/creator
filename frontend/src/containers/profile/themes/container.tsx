import React, { useState, useEffect } from 'react';
import { useThemeContext } from 'src/providers/dark-theme-provider';
import { observer } from 'mobx-react';
import { ITheme } from 'src/dal/themes/interface';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'; // import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, EffectCoverflow } from 'swiper';
import Button from 'src/components/button';
// Import Swiper styles
import 'swiper/swiper-bundle.css';

import { useMapStoreToProps } from './selectors';
import {
  ThemesWrapper,
  ThemesHeader,
  SwiperWrapper,
  ThemeItemBackground,
  ThemeItemText,
  PhoneWrapper,
  ActionRow,
  ThemeItemHeader,
  UserBlock,
  EmptyBlock,
} from './styles';

// interface IProps {}

// install Swiper modules
SwiperCore.use([Pagination, Navigation, EffectCoverflow]);

export const ThemesContainer = observer((props: any) => {
  const [activeTheme, setActiveTheme] = useState<ITheme | undefined>();
  const { DEVICE_THEME } = useThemeContext();
  const { themes, selectedTheme, getThemesAction, updateThemeAction } = useMapStoreToProps();

  useEffect(() => {
    getThemesAction();
  }, []);

  const onSelectTheme = () => {
    updateThemeAction(activeTheme as ITheme);
  };

  const onSlideChange = ({ realIndex }: any) => {
    const active = themes[realIndex];
    setActiveTheme(active);
  };

  return (
    <ThemesWrapper>
      {themes?.length > 0 ? (
        <>
          <ThemesHeader>Доступные темы</ThemesHeader>
          <SwiperWrapper width={window.innerWidth}>
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              onSlideChange={onSlideChange}
              coverflowEffect={{
                rotate: 35,
                stretch: 150,
                depth: 150,
                modifier: 1,
                slideShadows: false,
              }}
              loop={true}
              pagination={{
                clickable: true,
              }}>
              {themes?.map((theme, index) => (
                <SwiperSlide style={{ width: DEVICE_THEME.isMobile ? 'auto' : '40%' }} key={index}>
                  <PhoneWrapper isSelected={selectedTheme?.id === theme.id}>
                    <ThemeItemBackground color={theme.background}>
                      <UserBlock color={theme.color} />
                      <ThemeItemHeader color={theme.headerColor}>Заголовок</ThemeItemHeader>
                      <ThemeItemText color={theme.color}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
                        parturient montes, nascetur ridiculus mus.
                      </ThemeItemText>
                    </ThemeItemBackground>
                  </PhoneWrapper>
                </SwiperSlide>
              ))}
            </Swiper>
            <ActionRow>
              <Button
                onClick={onSelectTheme}
                kind={activeTheme?.id === selectedTheme?.id ? 'success' : 'formed'}
                block={true}>
                {activeTheme?.id === selectedTheme?.id ? 'Выбрана' : 'Выбрать'}
              </Button>
            </ActionRow>
          </SwiperWrapper>
        </>
      ) : (
        <EmptyBlock>Нет доступных тем</EmptyBlock>
      )}
    </ThemesWrapper>
  );
});
