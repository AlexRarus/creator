import styled from 'styled-components';
import { LIGHT_THEME } from 'src/components/theme';

export const ThemeEditorWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: ${({ theme }) => theme.background.primary};
`;
ThemeEditorWrapper.defaultProps = {
  theme: LIGHT_THEME,
};
