import styled from 'styled-components';
import { LIGHT_THEME, COLORS } from 'src/components/theme';

export const LinkRow = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  padding: 4px 6px;
  border-radius: 2px;
  border: 1px solid
    ${({ theme }) => (theme.themeType === 'light' ? COLORS.grey[800] : COLORS.grey[300])};
  background: ${({ theme }) => (theme.themeType === 'light' ? COLORS.grey[300] : COLORS.grey[800])};
`;
LinkRow.defaultProps = {
  theme: LIGHT_THEME,
};

export const DomainPart = styled.div`
  white-space: nowrap;
  color: ${({ theme }) => (theme.themeType === 'light' ? COLORS.grey[800] : COLORS.grey[300])};
`;

export const UsernamePart = styled.div<{ isActive: boolean }>`
  white-space: nowrap;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  color: ${({ theme }) => (theme.themeType === 'light' ? COLORS.indigo[600] : COLORS.indigo.A100)};
`;

export const SlugPart = styled.div<{ isActive: boolean }>`
  white-space: nowrap;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  color: ${({ theme }) => (theme.themeType === 'light' ? COLORS.pink[700] : COLORS.pink[500])};
`;

export const CanvasWrapperOuter = styled.div<{ isShow: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background: ${COLORS.white};
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
  transition: opacity 200ms ease-out;
`;

export const CanvasWrapperInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
