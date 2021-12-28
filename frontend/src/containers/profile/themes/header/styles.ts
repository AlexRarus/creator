import styled from 'styled-components';

export const ThemesHeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
`;

export const ThemesHeaderScrollable = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  overflow-y: auto;
`;

export const ThemesHeaderScrollableValue = styled.div`
  padding: ${({ theme }) => (theme?.isMobile ? '12px' : '20px')};
`;

export const ThemesHeaderStatic = styled.div<{
  headerHeight: number;
  hasLeftScroll: boolean;
  hasRightScroll: boolean;
}>`
  top: 0;
  height: 0;
  position: absolute;
  display: flex;
  width: 100%;
  padding: 0;

  :before {
    position: absolute;
    top: 0;
    left: 0;
    display: ${({ hasLeftScroll }) => (hasLeftScroll ? 'block' : 'none')};
    content: ' ';
    width: 40px;
    height: ${({ headerHeight }) => headerHeight}px;
    background: linear-gradient(to left, transparent, ${({ theme }) => theme.background.primary});
  }

  :after {
    position: absolute;
    top: 0;
    right: 0;
    display: ${({ hasRightScroll }) => (hasRightScroll ? 'block' : 'none')};
    content: ' ';
    width: 40px;
    height: ${({ headerHeight }) => headerHeight}px;
    background: linear-gradient(to right, transparent, ${({ theme }) => theme.background.primary});
  }
`;
