import React, { useState, useEffect, useMemo } from 'react';
import { useThemeContext } from 'src/providers/dark-theme-provider';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { ITheme, IThemeType } from 'src/dal/themes/interfaces';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react'; // import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, EffectCoverflow } from 'swiper';
import Button from 'src/components/button';
import ButtonGroup, { IButton } from 'src/components/buttons-group';
import { useTranslation } from 'react-i18next';
// Import Swiper styles
import 'swiper/css/bundle';

import { ThemeEditModal } from './theme-edit-modal';
import { useMapStoreToProps } from './selectors';
import {
  ThemesWrapper,
  ThemesHeader,
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
  const { i18n, t } = useTranslation('themes');

  const themesButtons: IButton[] = useMemo(
    () =>
      themesTypes.map((themeType: IThemeType) => ({
        label: t(`themeType.${themeType.slug || 'default'}`),
        value: themeType.slug,
      })),
    [themesTypes, i18n.language]
  );

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

  const changeThemeType = (value: string) => {
    history.push(`/profile/${username}/themes/${value}`);
  };

  return (
    <ThemesWrapper>
      <ThemesHeader>
        <ButtonGroup buttons={themesButtons} value={themeType} onChange={changeThemeType} />
      </ThemesHeader>
      {themes?.length > 0 || themeType === 'custom' ? (
        <SwiperWrapper width={window.innerWidth}>
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
              <SwiperSlide style={{ width: DEVICE_THEME.isMobile ? 'auto' : '40%' }} key={index}>
                <PhoneWrapper
                  color={theme.color}
                  isSelected={user?.theme?.id === theme.id}
                  onClick={
                    themeType === 'custom' ? () => openEditingThemeModal(theme.id) : undefined
                  }>
                  <ThemeItemBackground background={theme.background}>
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
            {themeType === 'custom' && (
              <SwiperSlide style={{ width: DEVICE_THEME.isMobile ? 'auto' : '40%' }}>
                <PhoneWrapper>
                  <ThemeItemBackground>
                    <CreateButton onClick={() => openEditingThemeModal('new')}>
                      <CreateButtonIconWrapper>
                        <AddIcon />
                      </CreateButtonIconWrapper>
                      <CreateButtonLabel>Добавить новую тему</CreateButtonLabel>
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
          themeId={editingThemeId}
          onClose={closeEditingThemeModal}
          onSuccess={updateThemesList}
          onRemove={updateThemesList}
        />
      )}
    </ThemesWrapper>
  );
});
