import styled from 'styled-components';
import { LIGHT_THEME, COLORS } from 'src/components/theme';

export const ThemeEditorWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: ${COLORS.white};
`;
ThemeEditorWrapper.defaultProps = {
  theme: LIGHT_THEME,
};
