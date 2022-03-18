import styled, { css } from 'styled-components';
import { COLORS } from 'src/components/theme';
import { Link } from 'react-router-dom';
import { rgba } from 'polished';

export const USER_MENU_BACKGROUND = COLORS.grey[700];
export const USER_MENU_BACKGROUND_HOVER = COLORS.grey[900];

export const UserMenuWrapper = styled.div<{ isOpen: boolean }>`
  background: ${({ isOpen, theme }) => (isOpen ? rgba(theme?.textColor?.primary, 0.1) : 'inherit')};
  padding: 5px;
  border-radius: 16px;
  transition: all 100ms ease-out;
`;

export const MenuList = styled.div``;

export const MenuItem = css`
  display: flex;
  background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.1)};
  color: ${({ theme }) => theme?.textColor?.primary};
  backdrop-filter: blur(8px);
  border-radius: 16px;
  margin-bottom: 4px;
  padding: 8px 10px;
  transition: all 200ms ease-out;

  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: none;
  }

  :hover {
    background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.2)};
  }

  cursor: pointer;
  user-select: none;
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

export const ModeLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;
