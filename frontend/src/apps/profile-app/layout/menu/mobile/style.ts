import styled from 'styled-components';
import { COLORS, defaultTheme } from 'src/components/theme';
import { Link } from 'react-router-dom';

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

export const MenuItem = styled(Link)`
  text-decoration: none;
  color: ${COLORS.grey[500]};

  :visited,
  :active {
    color: ${COLORS.grey[500]};
  }
`;

export const LogoutButton = styled.div`
  padding: 5px 10px;
  color: ${COLORS.grey[500]};
  border: 1px solid ${COLORS.grey[500]};
  border-radius: 4px;
  cursor: pointer;
`;
