import React, { useState } from 'react';
import { IUser } from 'src/dal/auth/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import NavigationIcon from '@material-ui/icons/Menu';

import { UserMenu } from '../user-menu';

import {
  MobileMenuWrapper,
  MobileMenuHeader,
  BackPlate,
  NavigationOpener,
  NavigationList,
  Logo,
  NavigationItem,
} from './style';

interface IProps {
  user: IUser | null;
  logoutAction(): void;
  selectedPage: IPage | null;
}

export const MobileMenu = (props: IProps) => {
  const { user, logoutAction, selectedPage } = props;
  const [isOpenNavigation, setIsOpenNavigation] = useState(false);

  const openNavigation = () => setIsOpenNavigation(true);
  const closeNavigation = () => setIsOpenNavigation(false);

  return (
    <MobileMenuWrapper>
      <MobileMenuHeader>
        <NavigationOpener onClick={openNavigation}>
          <NavigationIcon />
        </NavigationOpener>
        <UserMenu user={user} logoutAction={logoutAction} />
      </MobileMenuHeader>
      <BackPlate isOpen={isOpenNavigation} onClick={closeNavigation} />
      <NavigationList isOpen={isOpenNavigation} onClick={closeNavigation}>
        <Logo to='/'>LOGO</Logo>
        <NavigationItem
          activeClassName='selected'
          to={`/profile/${user?.username}/pages/${selectedPage?.slug}/`}>
          Страница
        </NavigationItem>
        <NavigationItem activeClassName='selected' to={`/profile/${user?.username}/requests/`}>
          Заявки
        </NavigationItem>
        <NavigationItem activeClassName='selected' to={`/profile/${user?.username}/themes/`}>
          Темы
        </NavigationItem>
      </NavigationList>
    </MobileMenuWrapper>
  );
};
