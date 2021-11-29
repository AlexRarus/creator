import styled from 'styled-components';

export const ThemesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${({ theme }) => (theme?.isMobile ? '12px' : '20px')};
`;

export const ThemesHeader = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: ${({ theme }) => (theme?.isMobile ? '18px' : '20px')};
  padding: ${({ theme }) => (theme?.isMobile ? '12px' : '20px')};
`;

export const ThemeItem = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  width: 100%;
  height: 140px;
  border 2px solid ${({ theme }) => theme?.component?.button?.borderColor?.secondary};
  background: ${({ isSelected, theme }) => (isSelected ? theme?.background?.secondary : 'inherit')};
  border-radius: 8px;
  cursor: pointer;
`;
