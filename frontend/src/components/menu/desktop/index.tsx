import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IUser } from 'src/dal/auth/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import { VerticalSlide } from 'src/components/animations';
import { useScrollDirection } from 'src/utils/useScrollDirection';
import { useDarkThemeContext } from 'src/providers/dark-theme-provider';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNightOutlined';
import Button from 'src/components/button';

import { UserMenu } from '../user-menu';
import { MENU_HEIGHT } from '../constants';
// import { ButtonLink } from '../style';
import { IMenuItem } from '../interfaces';

import {
  DesktopHeaderWrapper,
  DesktopMenuWrapper,
  LeftSide,
  RightSide,
  Logo,
  MenuItem,
  ThemeModeButton,
} from './style';

interface IProps {
  user: IUser | null;
  logoutAction(): void;
  selectedPage: IPage | null;
  isProfile: boolean;
  menuItems: IMenuItem[];
}

export const DesktopMenu = (props: IProps) => {
  const { user, logoutAction, selectedPage, isProfile, menuItems } = props;
  const history = useHistory();
  const { toggleTheme, themeType } = useDarkThemeContext();
  const isHideMenu: boolean = useScrollDirection(false, 15, 15);
  const { pathname } = useLocation();

  const onClickAuth = () => {
    const link = user
      ? `/profile/${user.username}/pages/${selectedPage?.slug}/`
      : `${pathname === '/auth/login/' ? '/auth/registration' : '/auth/login/'}`;
    history.push(link);
  };

  return (
    <DesktopHeaderWrapper>
      <VerticalSlide duration={200} state={isHideMenu} value={MENU_HEIGHT} direction={-1}>
        <DesktopMenuWrapper>
          <LeftSide>
            <Logo to='/'>LOGO</Logo>
            {menuItems.map((menuItem: IMenuItem) => (
              <MenuItem
                key={menuItem.url}
                activeClassName='selected'
                to={menuItem.url
                  .replace(/{{username}}/gim, user?.username || '')
                  .replace(/{{pageSlug}}/gim, selectedPage?.slug || '')}>
                {menuItem.label}
              </MenuItem>
            ))}
          </LeftSide>
          <RightSide>
            {isProfile && <UserMenu user={user} logoutAction={logoutAction} />}
            {!isProfile && (
              <>
                <Button kind={'secondary'} onClick={onClickAuth}>
                  {user ? 'В кабинет' : pathname === '/auth/login/' ? 'Авторизоваться' : 'Войти'}
                </Button>
              </>
            )}
            <ThemeModeButton onClick={toggleTheme}>
              {themeType === 'light' ? <LightModeIcon /> : <ModeNightIcon />}
            </ThemeModeButton>
          </RightSide>
        </DesktopMenuWrapper>
      </VerticalSlide>
    </DesktopHeaderWrapper>
  );
};
