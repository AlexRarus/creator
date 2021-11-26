import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import { Link, NavLink } from 'react-router-dom';

import { MENU_HEIGHT } from '../constants';

export const MobileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
`;

export const BackPlate = styled.div<{ isOpen: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: all ease-out 3000ms;
`;

export const MobileMenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  height: ${MENU_HEIGHT}px;
  width: 100%;
  padding: 12px;
`;

export const NavigationOpener = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 50px;
  height: 50px;
`;

export const NavigationList = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 99;
  width: 280px;
  height: 100%;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? 0 : -280)}px;
  transition: all ease-out 300ms;
`;

export const Logo = styled(Link)`
  padding: 15px 20px;
  text-decoration: none;
  border: 1px solid ${COLORS.grey[400]};

  :visited,
  :active {
    color: ${COLORS.grey[400]};
  }
`;

export const NavigationItem = styled(NavLink)`
  padding: 15px 20px 14px 20px;
  border-bottom: 1px solid transparent;
  text-decoration: none;

  :last-child {
    margin-right: 0;
  }

  :visited,
  :active {
    color: ${COLORS.grey.A400};
  }

  &.selected {
    color: ${COLORS.blue[600]};
    border-bottom: 1px solid ${COLORS.blue[500]};
  }
`;

export const ThemeModeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 8px;
`;
