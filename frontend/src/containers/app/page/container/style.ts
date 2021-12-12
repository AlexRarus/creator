import styled from 'styled-components';
import { ITheme } from 'src/dal/themes/interface';

export const PageWrapper = styled.div<{
  selectedTheme: ITheme | null;
  isApp: boolean;
  blockViewHeight: number;
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 48px 24px 24px 24px;
  height: ${({ isApp, blockViewHeight }) => (isApp ? `${blockViewHeight}px` : '100%')};
  overflow: auto;
  background: ${({ selectedTheme }) => selectedTheme?.background || 'inherit'};
`;
