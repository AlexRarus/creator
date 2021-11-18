import styled from 'styled-components';
import { COLORS, defaultTheme } from 'src/components/theme';
import { Link, NavLink } from 'react-router-dom';
import { rgba } from 'polished';

export const MobileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
`;
MobileMenuWrapper.defaultProps = {
  theme: defaultTheme,
};

export const BackPlate = styled.div<{ isOpen: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  background: ${rgba(COLORS.black, 0.5)};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: all ease-out 3000ms;
`;

export const MenuOpener = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 100%;
  top: 10px;
  right: 10px;
  background: ${COLORS.white};
  color: ${COLORS.black};
  box-shadow: 0 0 4px ${rgba(COLORS.black, 0.2)};
`;

export const MenuList = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  background: ${COLORS.white};
  z-index: 99;
  width: 280px;
  height: 100%;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? 0 : -280)}px;
  transition: all ease-out 300ms;
`;

export const Logo = styled(Link)`
  padding: 15px 20px;
  text-decoration: none;
  color: ${COLORS.grey[500]};
  border: 1px solid ${COLORS.black};

  :visited,
  :active {
    color: ${COLORS.grey[500]};
  }
`;

export const MenuItem = styled(NavLink)`
  padding: 15px 20px 14px 20px;
  border-bottom: 1px solid transparent;
  text-decoration: none;
  color: ${COLORS.grey[500]};

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

export const LogoutButton = styled.div`
  margin: 20px;
  padding: 5px 10px;
  color: ${COLORS.grey[500]};
  border: 1px solid ${COLORS.grey[500]};
  border-radius: 4px;
  cursor: pointer;
`;
