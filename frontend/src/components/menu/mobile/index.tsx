import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IUser } from 'src/dal/auth/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import NavigationIcon from '@mui/icons-material/Menu';
import { VerticalSlide } from 'src/components/animations';
import { useScrollDirection } from 'src/utils/useScrollDirection';
import { useDarkThemeContext } from 'src/providers/dark-theme-provider';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNightOutlined';
import Button from 'src/components/button';

import { UserMenu } from '../user-menu';
import { MENU_HEIGHT } from '../constants';
import { IMenuItem } from '../interfaces';
// import { ButtonLink } from '../style';

import {
  MobileMenuWrapper,
  MobileMenuHeader,
  BackPlate,
  NavigationOpener,
  NavigationList,
  Logo,
  NavigationItem,
  ThemeModeButton,
} from './style';

interface IProps {
  user: IUser | null;
  logoutAction(): void;
  selectedPage: IPage | null;
  isProfile: boolean;
  menuItems: IMenuItem[];
}

export const MobileMenu = (props: IProps) => {
  const { user, logoutAction, selectedPage, isProfile, menuItems } = props;
  const history = useHistory();
  const [isOpenNavigation, setIsOpenNavigation] = useState(false);
  const isHideMenu: boolean = useScrollDirection(false, 15, 15);
  const hasMenuItems = Boolean(menuItems.length);
  const { toggleTheme, themeType } = useDarkThemeContext();

  const onClickAuth = () => {
    const link = user ? `/profile/${user.username}/pages/${selectedPage?.slug}/` : `/auth/login/`;
    history.push(link);
  };

  const openNavigation = () => setIsOpenNavigation(true);
  const closeNavigation = () => setIsOpenNavigation(false);

  return (
    <MobileMenuWrapper>
      <VerticalSlide duration={200} state={isHideMenu} value={MENU_HEIGHT} direction={-1}>
        <MobileMenuHeader>
          {hasMenuItems && (
            <NavigationOpener onClick={openNavigation}>
              <NavigationIcon />
            </NavigationOpener>
          )}
          {!hasMenuItems && <Logo to='/'>LOGO</Logo>}
          {isProfile && <UserMenu user={user} logoutAction={logoutAction} />}
          {!isProfile && (
            <>
              {!isProfile && (
                <>
                  <Button kind={'secondary'} onClick={onClickAuth}>
                    {user ? 'В кабинет' : 'Авторизоваться'}
                  </Button>
                </>
              )}
              <ThemeModeButton onClick={toggleTheme}>
                {themeType === 'light' ? (
                  <LightModeIcon fontSize={'small'} />
                ) : (
                  <ModeNightIcon fontSize={'small'} />
                )}
              </ThemeModeButton>
            </>
          )}
        </MobileMenuHeader>
      </VerticalSlide>
      <BackPlate isOpen={isOpenNavigation} onClick={closeNavigation} />
      <NavigationList isOpen={isOpenNavigation} onClick={closeNavigation}>
        <Logo to='/'>LOGO</Logo>
        {menuItems.map((menuItem: IMenuItem) => (
          <NavigationItem
            key={menuItem.url}
            activeClassName='selected'
            to={menuItem.url
              .replace(/{{username}}/gim, user?.username || '')
              .replace(/{{pageSlug}}/gim, selectedPage?.slug || '')}>
            {menuItem.label}
          </NavigationItem>
        ))}
      </NavigationList>
    </MobileMenuWrapper>
  );
};
