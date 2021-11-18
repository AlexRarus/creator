import React from 'react';
import { IUser } from 'src/dal/auth/interfaces';
import { IPage } from 'src/dal/pages/interfaces';

import { MobileMenuWrapper, LeftSide, RightSide, MenuItem, LogoutButton } from './style';

interface IProps {
  user: IUser | null;
  logoutAction(): void;
  selectedPage: IPage | null;
}

export const MobileMenu = (props: IProps) => {
  const { user, logoutAction, selectedPage } = props;

  return (
    <MobileMenuWrapper>
      <LeftSide>
        <MenuItem to={`/profile/${user?.username}/pages/`}>Мои страницы</MenuItem>
        <MenuItem to={`/profile/${user?.username}/pages/${selectedPage?.slug}/`}>Страница</MenuItem>
        <MenuItem to={`/profile/${user?.username}/requests/`}>Заявки</MenuItem>
        <MenuItem to={`/profile/${user?.username}/themes/`}>Темы</MenuItem>
      </LeftSide>
      <RightSide>
        <LogoutButton onClick={logoutAction}>Выйти</LogoutButton>
      </RightSide>
    </MobileMenuWrapper>
  );
};
