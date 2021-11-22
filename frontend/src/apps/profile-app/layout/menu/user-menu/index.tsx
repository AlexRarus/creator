import React, { useState } from 'react';
import { Avatar } from 'src/components/avatar';
import Popup from 'src/components/popup';
import { IUser } from 'src/dal/auth/interfaces';

import {
  UserMenuWrapper,
  MenuList,
  MenuItemLink,
  MenuItemButton,
  USER_MENU_BACKGROUND,
} from './style';

interface IProps {
  user: IUser | null;
  logoutAction(): void;
}

export const UserMenu = (props: IProps) => {
  const { user, logoutAction } = props;
  const [openerElement, openerRefCallback] = useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => setIsOpen(true);
  const closeHandler = () => setIsOpen(false);

  return (
    <UserMenuWrapper
      ref={openerRefCallback}
      isOpen={isOpen}
      onClick={openHandler}
      onMouseEnter={openHandler}
      onMouseLeave={closeHandler}>
      <Avatar />
      <Popup
        isOpen={isOpen}
        onClose={closeHandler}
        openerElement={openerElement}
        horizontalAlign='end'
        verticalAlign='end'
        position='bottom'
        maxHeight={320}
        plateMargin={0}
        zIndex={99}
        background={USER_MENU_BACKGROUND}
        hasBorder={false}
        hasShadow={false}
        borderRadius='4px 0 4px 4px'
        hasPointer={false}>
        <MenuList>
          <MenuItemLink to={`/profile/${user?.username}/pages/`}>Мои страницы</MenuItemLink>
          <MenuItemLink to={`/profile/${user?.username}/settings/`}>
            Настройки аккаунта
          </MenuItemLink>
          <MenuItemButton onClick={logoutAction}>Выход</MenuItemButton>
        </MenuList>
      </Popup>
    </UserMenuWrapper>
  );
};
