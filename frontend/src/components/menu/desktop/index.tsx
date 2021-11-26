import React from 'react';
import { IUser } from 'src/dal/auth/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import { VerticalSlide } from 'src/components/animations';
import { useScrollDirection } from 'src/utils/useScrollDirection';
import { useDarkThemeContext } from 'src/providers/dark-theme-provider';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNightOutlined';

import { UserMenu } from '../user-menu';
import { MENU_HEIGHT } from '../constants';
import { ButtonLink } from '../style';
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
  const { toggleTheme, themeType } = useDarkThemeContext();
  const isHideMenu: boolean = useScrollDirection(false, 15, 15);

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
                {!user && <ButtonLink to={`/auth/login/`}>Авторизоваться</ButtonLink>}
                {user && (
                  <ButtonLink to={`/profile/${user.username}/pages/${selectedPage?.slug}/`}>
                    В кабинет
                  </ButtonLink>
                )}
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
