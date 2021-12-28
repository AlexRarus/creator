import styled from 'styled-components';
import { ITheme } from 'src/dal/themes/interfaces';
import { getThemeBackground } from 'src/dal/themes/style';

export const PageWrapper = styled.div<{
  selectedTheme?: ITheme | null;
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 48px 24px 24px 24px;
  overflow: auto;
  background: ${({ selectedTheme }) => getThemeBackground(selectedTheme) || 'inherit'};
`;
