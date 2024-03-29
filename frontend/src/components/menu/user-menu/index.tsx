import React, { useState } from 'react';
import { AvatarPreview } from 'src/components/avatar-preview';
import Popup from 'src/components/popup';
import { IUser } from 'src/dal/auth/interfaces';
import { useThemeContext } from 'src/providers/main-theme-provider';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNightOutlined';

import {
  UserMenuWrapper,
  MenuList,
  MenuItemLink,
  MenuItemButton,
  USER_MENU_BACKGROUND,
  ModeLabel,
} from './style';

interface IProps {
  user: IUser | null;
  logoutAction(): void;
}

export const UserMenu = (props: IProps) => {
  const { user, logoutAction } = props;
  const [openerElement, openerRefCallback] = useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { themeType, toggleTheme } = useThemeContext();

  const toggleThemeAction = () => {
    if (themeType === 'light') {
      toggleTheme('dark');
    } else {
      toggleTheme('light');
    }
  };

  const toggleHandler = () => setIsOpen(true);
  const closeHandler = () => setIsOpen(false);

  return (
    <UserMenuWrapper ref={openerRefCallback} isOpen={isOpen} onClick={toggleHandler}>
      <AvatarPreview dimension='xs' avatar={user?.avatar} />
      <Popup
        isOpen={isOpen}
        onClose={closeHandler}
        openerElement={openerElement}
        horizontalAlign='end'
        verticalAlign='end'
        position='bottom'
        maxHeight={320}
        plateMargin={4}
        zIndex={99}
        background={'transparent'}
        hasBorder={false}
        hasShadow={false}
        borderRadius='16px'
        hasPointer={false}>
        <MenuList>
          <MenuItemLink to={`/profile/${user?.username}/pages/`}>Мои страницы</MenuItemLink>
          <MenuItemLink to={`/profile/${user?.username}/settings/`}>
            Настройки аккаунта
          </MenuItemLink>
          <MenuItemButton onClick={toggleThemeAction}>
            {themeType === 'light' ? (
              <ModeLabel>
                Светлая тема
                <LightModeIcon />
              </ModeLabel>
            ) : (
              <ModeLabel>
                Темная тема
                <ModeNightIcon />
              </ModeLabel>
            )}
          </MenuItemButton>
          <MenuItemButton onClick={logoutAction}>Выход</MenuItemButton>
        </MenuList>
      </Popup>
    </UserMenuWrapper>
  );
};
