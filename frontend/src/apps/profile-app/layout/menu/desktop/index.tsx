import React from 'react';
import { IUser } from 'src/dal/auth/interfaces';
import { IPage } from 'src/dal/pages/interfaces';

import { UserMenu } from '../user-menu';

import { DesktopMenuWrapper, LeftSide, RightSide, Logo, MenuItem } from './style';

interface IProps {
  user: IUser | null;
  logoutAction(): void;
  selectedPage: IPage | null;
}

export const DesktopMenu = (props: IProps) => {
  const { user, logoutAction, selectedPage } = props;

  return (
    <DesktopMenuWrapper>
      <LeftSide>
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
      </LeftSide>
      <RightSide>
        <UserMenu user={user} logoutAction={logoutAction} />
      </RightSide>
    </DesktopMenuWrapper>
  );
};
