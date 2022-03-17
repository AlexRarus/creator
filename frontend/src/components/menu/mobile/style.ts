import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import { rgba } from 'polished';
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
  background-color: ${({ theme }) => theme?.background?.primary};
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
  background: ${({ theme }) => rgba(theme?.background?.primary, 0.9)};
  box-shadow: 0px 0px 150px -15px ${({ theme, isOpen }) => (isOpen ? rgba(theme?.textColor?.primary, 0.15) : 'transparent')};
  backdrop-filter: blur(4px);
  transition: all cubic-bezier(0, 1.2, 0.12, 1) 250ms;
`;

export const Logo = styled(Link)`
  padding: 16px 20px;
  text-decoration: none;
  margin-right: auto;

  :visited,
  :active {
    color: ${COLORS.grey[400]};
  }
`;

export const NavigationItem = styled(NavLink)`
  padding: 15px 20px 14px 20px;
  text-decoration: none;
  color ${({ theme }) => theme?.textColor?.primary};
  font-size: ${({ theme }) => (theme?.isMobile ? '18px' : '16px')};
  font-weight: ${({ theme }) => (theme?.isMobile ? '600' : '400')};

  :last-child {
    margin-right: 0;
  }

  &.selected {
    background-color: ${({ theme }) => theme?.component?.input?.borderColor?.hover};
  }
`;

export const ThemeModeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 8px;
`;
