import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IUser } from 'src/dal/auth/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import { VerticalSlide } from 'src/components/animations';
import { useScrollDirection } from 'src/utils/useScrollDirection';
import Button from 'src/components/button';

import { UserMenu } from '../user-menu';
import { MENU_HEIGHT } from '../constants';
import { IMenuItem } from '../interfaces';
import { LogoComponent } from '../logo';

import {
  DesktopHeaderWrapper,
  DesktopMenuWrapper,
  LeftSide,
  RightSide,
  Logo,
  MenuItem,
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
  const navigate = useNavigate();
  const isHideMenu: boolean = useScrollDirection(false, 15, 15);
  const { pathname } = useLocation();

  const onClickAuth = () => {
    const link = user
      ? `/profile/${user.username}/pages/${selectedPage?.slug}/`
      : `${pathname === '/auth/login/' ? '/auth/registration' : '/auth/login/'}`;
    navigate(link);
  };

  return (
    <DesktopHeaderWrapper>
      <VerticalSlide duration={200} state={isHideMenu} value={MENU_HEIGHT} direction={-1}>
        <DesktopMenuWrapper>
          <LeftSide>
            <Logo to='/'>
              <LogoComponent />
            </Logo>
            {menuItems.map((menuItem: IMenuItem) => (
              <MenuItem
                key={menuItem.url}
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
                <Button
                  kind='secondary'
                  onClick={onClickAuth}
                  disabled={Boolean(user) && !selectedPage?.slug}>
                  {user ? 'В кабинет' : pathname === '/auth/login/' ? 'Регистрация' : 'Войти'}
                </Button>
              </>
            )}
          </RightSide>
        </DesktopMenuWrapper>
      </VerticalSlide>
    </DesktopHeaderWrapper>
  );
};
