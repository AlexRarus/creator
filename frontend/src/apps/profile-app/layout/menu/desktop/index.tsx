import React from 'react';
import { IUser } from 'src/dal/auth/interfaces';
import { IPage } from 'src/dal/pages/interfaces';

import { DesktopMenuWrapper, LeftSide, RightSide, MenuItem, LogoutButton } from './style';

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
        <MenuItem
          activeClassName='selected'
          to={`/profile/${user?.username}/pages/${selectedPage?.slug}/`}>
          Страницы
        </MenuItem>
        <MenuItem activeClassName='selected' to={`/profile/${user?.username}/requests/`}>
          Заявки
        </MenuItem>
        <MenuItem activeClassName='selected' to={`/profile/${user?.username}/themes/`}>
          Темы
        </MenuItem>
      </LeftSide>
      <RightSide>
        <LogoutButton onClick={logoutAction}>Выйти</LogoutButton>
      </RightSide>
    </DesktopMenuWrapper>
  );
};
