import styled, { css } from 'styled-components';
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
  ${({ selectedTheme }) => getUserThemeStyles(selectedTheme)}
`;

const getAnimationSize = (props: { animationSize?: string }) => {
  const { animationSize = 'width' } = props;

  switch (animationSize) {
    case 'width':
      return css`
        width: 100%;
        height: auto;
      `;
    case 'height':
      return css`
        width: auto;
        height: 100%;
      `;
    case 'both':
      return css`
        width: 100%;
        height: 100%;
      `;
    default:
      return css`
        width: 100%;
        height: ${animationSize};
      `;
  }
};

const getAnimationPosition = (props: { animationPosition?: string }) => {
  const { animationPosition = 'top' } = props;

  switch (animationPosition) {
    case 'top':
      return css`
        top: 0;
      `;
    case 'bottom':
      return css`
        bottom: 0;
      `;
    default:
      return css`
        top: 0;
      `;
  }
};

export const ThemeAnimationBackground = styled.div<{
  animationPosition?: string;
  animationSize?: string;
}>`
  position: absolute;
  left: 0;
  ${getAnimationSize}
  ${getAnimationPosition}

  div {
    ${getAnimationSize}
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: fit-content;
  min-height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
