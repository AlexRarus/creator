import { COLORS } from 'src/components/theme';

import { ITheme } from './interfaces';

export const getThemeBackground = (theme?: Partial<ITheme> | null) => {
  const targetTheme = theme || ({} as Partial<ITheme>);
  const {
    backgroundType,
    backgroundColor = COLORS.white,
    backgroundGradient,
    backgroundImage,
    // backgroundRepeat,
    // backgroundSmooth,
  } = targetTheme;
  const backgroundPrefix = backgroundType === 'color' ? backgroundColor : backgroundGradient;
  return `${backgroundPrefix}${backgroundImage ? ` url('/media/${backgroundImage.src}')` : ''}`;
};
