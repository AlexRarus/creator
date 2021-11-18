import styled from 'styled-components';
import { COLORS, defaultTheme } from 'src/components/theme';
import { Link, NavLink } from 'react-router-dom';

export const MobileMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 15px 30px;
  background: ${COLORS.white};
  color: ${COLORS.black};
  justify-content: space-between;
  height: 64px;
  user-select: none;
`;
MobileMenuWrapper.defaultProps = {
  theme: defaultTheme,
};

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
LeftSide.defaultProps = {
  theme: defaultTheme,
};
export const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
RightSide.defaultProps = {
  theme: defaultTheme,
};

export const MenuItem = styled(NavLink)`
  padding: 15px 0 14px 0;
  border-bottom: 1px solid transparent;
  text-decoration: none;
  color: ${COLORS.grey[500]};
  margin-right: 30px;

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
  padding: 5px 10px;
  color: ${COLORS.grey[500]};
  border: 1px solid ${COLORS.grey[500]};
  border-radius: 4px;
  cursor: pointer;
`;
