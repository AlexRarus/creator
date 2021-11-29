import styled, { css } from 'styled-components';
import { COLORS } from 'src/components/theme';
import { Link } from 'react-router-dom';

export const USER_MENU_BACKGROUND = COLORS.grey[700];
export const USER_MENU_BACKGROUND_HOVER = COLORS.grey[900];

export const UserMenuWrapper = styled.div<{ isOpen: boolean }>`
  background: ${({ isOpen }) => (isOpen ? USER_MENU_BACKGROUND : 'inherit')};
  padding: 5px;
  border-radius: 4px 4px 0 0;
  transition: all 100ms ease-out;
`;

export const MenuList = styled.div`
  background: ${USER_MENU_BACKGROUND};
`;

export const MenuItem = css`
  color: ${COLORS.white};
  padding: 15px;
  transition: all 200ms ease-out;
  background: ${USER_MENU_BACKGROUND};

  border-top: 1px solid ${COLORS.grey[600]};
  border-bottom: 1px solid ${COLORS.grey[800]};

  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${USER_MENU_BACKGROUND_HOVER};
  }
`;

export const MenuItemLink = styled(Link)`
  display: block;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  ${MenuItem}
`;
export const MenuItemButton = styled.div`
  cursor: pointer;
  user-select: none;
  ${MenuItem}
`;
