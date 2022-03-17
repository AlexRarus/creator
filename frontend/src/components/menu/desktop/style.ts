import styled from 'styled-components';
import { rgba } from 'polished';
import { COLORS } from 'src/components/theme';
import { Link, NavLink } from 'react-router-dom';
import LogoSvg from 'src/assets/logo.svg';
import DarkLogoSvg from 'src/assets/dark-logo.svg';

import { MENU_HEIGHT } from '../constants';

export const LogoIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 46px;
  background-image: url(${({ theme }) => (theme?.themeType === 'light' ? DarkLogoSvg : LogoSvg)});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const LogoWrapper = styled.div`
  position: relative;
  width: 88px;
  height: 36px;
  overflow: hidden;
`;

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
  text-decoration: none;
  margin-right: 40px;

  :visited,
  :active {
    color: ${COLORS.grey[500]};
  }
`;

export const MenuItem = styled(NavLink)`
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

  cursor: pointer;
  user-select: none;

  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 12px;

  :last-child {
    margin-right: 0;
  }

  :visited,
  :active {
    background: ${COLORS.blue[400]};
  }

  &.selected {
    color: ${COLORS.white};
    background: ${COLORS.blue[500]};
  }
`;
