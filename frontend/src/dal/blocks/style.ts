import { css } from 'styled-components';
import { COLORS } from 'src/components/theme';

import { ISectionData } from './section-interfaces';

export const getSectionStyle = (section?: Partial<ISectionData> | null) => {
  const targetSection = section || ({} as Partial<ISectionData>);
  const {
    backgroundType,
    backgroundColor = 'transparent',
    backgroundGradient = COLORS.white,
    backgroundImage,
    backgroundRepeat,
    backgroundSize,
    backgroundPosition,
    // backgroundSmooth,
    // backgroundParallax,
    color,
  } = targetSection;
  const backgroundPrefix = backgroundType === 'color' ? backgroundColor : backgroundGradient;
  const backgroundPostfix = backgroundImage ? ` url('/media/${backgroundImage.src}')` : '';

  return css`
    background: ${backgroundPrefix} ${backgroundPostfix};
    background-repeat: ${backgroundRepeat};
    background-size: ${backgroundSize || 'auto'};
    background-position: ${backgroundPosition || 'initial'};

    color: ${color};
  `;
};
