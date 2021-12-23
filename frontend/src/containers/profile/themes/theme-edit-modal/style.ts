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

export const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BlockTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;
