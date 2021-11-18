import React from 'react';
import { IUser } from 'src/dal/auth/interfaces';
import { IPage } from 'src/dal/pages/interfaces';

import { DesktopMenuWrapper, LeftSide, RightSide, Logo, ButtonLink } from './style';

interface IProps {
  user: IUser | null;
  logoutAction(): void;
  selectedPage: IPage | null;
}

export const DesktopMenu = (props: IProps) => {
  const { user, logoutAction } = props;

  return (
    <DesktopMenuWrapper>
      <LeftSide>
        <Logo to='/'>LOGO</Logo>
      </LeftSide>
      <RightSide>
        {!user && <ButtonLink to={`/auth/login/`}>Авторизоваться</ButtonLink>}
        {user && <ButtonLink to={`/profile/${user.username}/pages/`}>В кабинет</ButtonLink>}
      </RightSide>
    </DesktopMenuWrapper>
  );
};
