import React, { useState, useEffect } from 'react';
import { useThemeContext } from 'src/providers/dark-theme-provider';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { ITheme } from 'src/dal/themes/interface';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'; // import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, EffectCoverflow } from 'swiper';
import Button from 'src/components/button';
// Import Swiper styles
import 'swiper/swiper-bundle.css';

import { ThemeEditModal } from './theme-edit-modal';
import { useMapStoreToProps } from './selectors';
import {
  ThemesWrapper,
  ThemesHeader,
  ThemesHeaderTitle,
  CreateButton,
  SwiperWrapper,
  ThemeItemBackground,
  ThemeItemText,
  PhoneWrapper,
  ActionRow,
  ThemeItemHeader,
  UserBlock,
  EmptyBlock,
  SuccessLabel,
} from './styles';

// interface IProps {}

// install Swiper modules
SwiperCore.use([Pagination, Navigation, EffectCoverflow]);

export const ThemesContainer = observer((props: any) => {
  const { username } = props;
  const [activeTheme, setActiveTheme] = useState<ITheme | undefined>();
  const [editingThemeId, setEditingThemeId] = useState<number | 'new' | null>(null);
  const { DEVICE_THEME } = useThemeContext();
  const {
    themes,
    selectedTheme,
    getThemesAction,
    updateThemeAction,
    selectedPage,
  } = useMapStoreToProps();
  const history = useHistory();

  useEffect(() => {
    getThemesAction();
  }, []);

  const onClickTheme = (isSelected?: boolean) => () => {
    isSelected ? toEditPage() : updateThemeAction(activeTheme as ITheme);
  };

  const onSlideChange = ({ realIndex }: any) => {
    const active = themes[realIndex];
    setActiveTheme(active);
  };

  const toEditPage = () =>
    history.push(`/profile/${username}/pages/${selectedPage?.slug || 'main'}`);

  const closeEditingThemeModal = () => setEditingThemeId(null);
  const openEditingThemeModal = (id: number | 'new') => setEditingThemeId(id);
  const successEditingThemeModal = (data: any) => {
    // todo обновляем список доступных тем
    getThemesAction();
    console.log('successEditingThemeModal', data);
  };

  return (
    <ThemesWrapper>
      <ThemesHeader>
        <ThemesHeaderTitle>Доступные темы</ThemesHeaderTitle>
        <CreateButton onClick={() => openEditingThemeModal('new')}>Создать</CreateButton>
      </ThemesHeader>
      {themes?.length > 0 ? (
        <>
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
                  <PhoneWrapper color={theme.color} isSelected={selectedTheme?.id === theme.id}>
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
                onClick={onClickTheme(activeTheme?.id === selectedTheme?.id)}
                kind={activeTheme?.id === selectedTheme?.id ? 'success' : 'formed'}
                block={true}>
                {activeTheme?.id === selectedTheme?.id ? (
                  <SuccessLabel>
                    Выбрана <ArrowForwardIosIcon />
                  </SuccessLabel>
                ) : (
                  'Выбрать'
                )}
              </Button>
            </ActionRow>
          </SwiperWrapper>
        </>
      ) : (
        <EmptyBlock>Нет доступных тем</EmptyBlock>
      )}
      {editingThemeId !== null && (
        <ThemeEditModal
          themeId={editingThemeId}
          onClose={closeEditingThemeModal}
          onSuccess={successEditingThemeModal}
        />
      )}
    </ThemesWrapper>
  );
});
