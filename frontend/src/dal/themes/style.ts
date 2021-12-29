import { css } from 'styled-components';
import { COLORS } from 'src/components/theme';

import { ITheme } from './interfaces';

export const getUserThemeStyles = (theme?: Partial<ITheme> | null) => {
  const targetTheme = theme || ({} as Partial<ITheme>);
  const {
    backgroundType = 'color',
    backgroundColor = COLORS.white,
    backgroundGradient = COLORS.white,
    backgroundImage,
    backgroundRepeat,
    backgroundSize,
    backgroundPosition,
    // backgroundSmooth,
    color = COLORS.black,
    headerColor = COLORS.black,
  } = targetTheme;
  const backgroundImageUrl = backgroundImage ? ` url('/media/${backgroundImage.src}'), ` : '';

  return css`
    ${backgroundType === 'color' && `background: ${backgroundImageUrl}${backgroundColor}`};
    ${backgroundType === 'gradient' &&
    `background-image: ${backgroundImageUrl}${backgroundGradient}`};
    background-repeat: ${backgroundRepeat};
    background-size: ${backgroundSize || 'auto'};
    background-position: ${backgroundPosition || 'initial'};

    color: ${color};

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${headerColor};
    }
  `;
};
