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
  const backgroundImageUrl = backgroundImage ? ` url('/media/${backgroundImage.src}'), ` : '';

  return css`
    ${backgroundType === 'color' && `background: ${backgroundImageUrl}${backgroundColor}`};
    ${backgroundType === 'gradient' &&
    `background-image: ${backgroundImageUrl}${backgroundGradient}`};
    background-repeat: ${backgroundRepeat};
    background-size: ${backgroundSize || 'auto'};
    background-position: ${backgroundPosition || 'initial'};

    color: ${color};
  `;
};
