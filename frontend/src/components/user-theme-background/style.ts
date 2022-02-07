import styled from 'styled-components';
import { ITheme } from 'src/dal/themes/interfaces';
import { getUserThemeStyles } from 'src/dal/themes/style';

export const ThemeBackground = styled.div<{
  selectedTheme?: ITheme | null;
  backgroundStretch: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: auto;
  min-height: ${({ backgroundStretch }) => (backgroundStretch ? '100%' : 'auto')};
  padding: 0 10px;
  ${({ selectedTheme }) => getUserThemeStyles(selectedTheme)}
`;

const getAnimationPosition = (props: { position?: string; size?: string }) => {
  const { position = 'top' } = props;

  return `${position}: 0`;
};

export const ThemeAnimationBackground = styled.div<{ position?: string; size?: string }>`
  position: absolute;
  width: auto;
  height: ${({ size = 'auto' }) => size};
  left: 0;
  ${getAnimationPosition}
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  min-height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
