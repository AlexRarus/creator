import React, { useState } from 'react';
import { IUser } from 'src/dal/auth/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import MenuIcon from '@material-ui/icons/Menu';

import {
  MobileMenuWrapper,
  BackPlate,
  MenuOpener,
  MenuList,
  Logo,
  MenuItem,
  LogoutButton,
} from './style';

interface IProps {
  user: IUser | null;
  logoutAction(): void;
  selectedPage: IPage | null;
}

export const MobileMenu = (props: IProps) => {
  const { user, logoutAction, selectedPage } = props;
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <MobileMenuWrapper>
      <BackPlate isOpen={isOpen} onClick={closeMenu} />
      <MenuOpener onClick={openMenu}>
        <MenuIcon />
      </MenuOpener>
      <MenuList isOpen={isOpen} onClick={closeMenu}>
        <Logo to='/'>LOGO</Logo>
        <MenuItem
          activeClassName='selected'
          to={`/profile/${user?.username}/pages/${selectedPage?.slug}/`}>
          Страница
        </MenuItem>
        <MenuItem activeClassName='selected' to={`/profile/${user?.username}/requests/`}>
          Заявки
        </MenuItem>
        <MenuItem activeClassName='selected' to={`/profile/${user?.username}/themes/`}>
          Темы
        </MenuItem>
        <LogoutButton onClick={logoutAction}>Выйти</LogoutButton>
      </MenuList>
    </MobileMenuWrapper>
  );
};
