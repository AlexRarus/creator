import React, { useState, useEffect } from 'react';
import { useThemeContext } from 'src/providers/dark-theme-provider';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { ITheme } from 'src/dal/themes/interfaces';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react'; // import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, EffectCoverflow } from 'swiper';
import Button from 'src/components/button';
// Import Swiper styles
import 'swiper/css/bundle';

import { ThemesHeader } from './header';
import { ThemeEditModal } from './theme-edit-modal';
import { useMapStoreToProps } from './selectors';
import {
  ThemesWrapper,
  CreateButton,
  CreateButtonIconWrapper,
  CreateButtonLabel,
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

// install Swiper modules
SwiperCore.use([Pagination, Navigation, EffectCoverflow]);

export const ThemesContainer = observer((props: any) => {
  const { username, themeType = '' } = props;
  const [activeTheme, setActiveTheme] = useState<ITheme | undefined>();
  const [editingThemeId, setEditingThemeId] = useState<number | 'new' | null>(null);
  const { DEVICE_THEME } = useThemeContext();
  const {
    user,
    themes,
    getThemesByTypeAction,
    selectThemeAction,
    selectedPage,
    themesTypes,
    getThemesTypesAction,
  } = useMapStoreToProps();
  const history = useHistory();

  useEffect(() => {
    // получаем типы тем, если их еще нет
    if (!themesTypes.length) {
      getThemesTypesAction();
    }
  }, []);

  useEffect(() => {
    // получаем темы если изменился фильтр типов
    getThemesByTypeAction(themeType);
  }, [themeType]);

  const onClickTheme = (isSelected?: boolean) => () => {
    isSelected ? toEditPage() : selectThemeAction(activeTheme as ITheme);
  };

  const onSlideChange = (swiper: any) => {
    const { realIndex } = swiper;
    const maxIndex = themes.length - 1;
    setActiveTheme(realIndex > maxIndex ? undefined : themes[realIndex]);
  };

  const toEditPage = () =>
    history.push(`/profile/${username}/pages/${selectedPage?.slug || 'main'}`);

  const closeEditingThemeModal = () => {
    setEditingThemeId(null);
  };
  const openEditingThemeModal = (id: number | 'new') => setEditingThemeId(id);
  const updateThemesList = () => getThemesByTypeAction(themeType);

  const canEditThemes = themeType === 'custom' || user?.role === 'admin';

  return (
    <ThemesWrapper width={window.innerWidth}>
      <ThemesHeader username={username} themeType={themeType} themesTypes={themesTypes} />
      {themes?.length > 0 || canEditThemes ? (
        <SwiperWrapper>
          <Swiper
            effect='coverflow'
            grabCursor={true}
            centeredSlides={true}
            slidesPerView='auto'
            onSlideChange={onSlideChange}
            coverflowEffect={{
              rotate: 35,
              stretch: 150,
              depth: 150,
              modifier: 1,
              slideShadows: false,
            }}
            // loop={true} todo сбивается позиция элементов при удалении или добавлении новых элементов
            initialSlide={themes.length - 1}
            pagination={{
              clickable: true,
            }}>
            {themes?.map((theme, index) => (
              <SwiperSlide style={{ width: DEVICE_THEME.isMobile ? '90%' : '40%' }} key={index}>
                <PhoneWrapper
                  color={theme.color}
                  isSelected={user?.theme?.id === theme.id}
                  onClick={canEditThemes ? () => openEditingThemeModal(theme.id) : undefined}>
                  <ThemeItemBackground
                    backgroundType={theme.backgroundType}
                    backgroundColor={theme.backgroundColor}
                    backgroundGradient={theme.backgroundGradient}
                    backgroundImage={theme.backgroundImage}
                    backgroundRepeat={theme.backgroundRepeat}
                    backgroundSmooth={theme.backgroundSmooth}>
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
            {canEditThemes && (
              <SwiperSlide style={{ width: DEVICE_THEME.isMobile ? '90%' : '40%' }}>
                <PhoneWrapper>
                  <ThemeItemBackground>
                    <CreateButton onClick={() => openEditingThemeModal('new')}>
                      <CreateButtonIconWrapper>
                        <AddIcon />
                      </CreateButtonIconWrapper>
                      <CreateButtonLabel>
                        Добавить новую тему
                        {themeType !== 'custom' && <div>(Для всех пользователей)</div>}
                      </CreateButtonLabel>
                    </CreateButton>
                  </ThemeItemBackground>
                </PhoneWrapper>
              </SwiperSlide>
            )}
          </Swiper>
          <ActionRow>
            {activeTheme && (
              <Button
                onClick={onClickTheme(activeTheme?.id === user?.theme?.id)}
                kind={activeTheme?.id === user?.theme?.id ? 'success' : 'formed'}
                block={true}>
                {activeTheme?.id === user?.theme?.id ? (
                  <SuccessLabel>
                    Выбрана <ArrowForwardIosIcon />
                  </SuccessLabel>
                ) : (
                  'Выбрать'
                )}
              </Button>
            )}
          </ActionRow>
        </SwiperWrapper>
      ) : (
        <EmptyBlock>Нет доступных тем</EmptyBlock>
      )}
      {editingThemeId !== null && (
        <ThemeEditModal
          themeType={themeType}
          themeId={editingThemeId}
          onClose={closeEditingThemeModal}
          onSuccess={updateThemesList}
          onRemove={updateThemesList}
        />
      )}
      <div style={{ height: '300px', width: '100%' }} />
    </ThemesWrapper>
  );
});
