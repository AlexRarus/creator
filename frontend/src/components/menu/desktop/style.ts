import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import { Link, NavLink } from 'react-router-dom';

import { MENU_HEIGHT } from '../constants';

export const DesktopHeaderWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
`;

export const DesktopMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  padding: 0 42px;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  background-color: ${({ theme }) => theme?.background?.primary};
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const ThemeModeButton = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Logo = styled(Link)`
  padding: 15px 0;
  text-decoration: none;
  margin-right: 50px;

  :visited,
  :active {
    color: ${COLORS.grey[500]};
  }
`;

export const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  text-decoration: none;
  margin-right: 30px;
  height: ${MENU_HEIGHT}px;

  :last-child {
    margin-right: 0;
  }

  :visited,
  :active {
    color: ${COLORS.grey[500]};
  }

  &.selected {
    color: ${COLORS.blue[600]};
    border-bottom: 1px solid ${COLORS.blue[600]};
  }
`;
