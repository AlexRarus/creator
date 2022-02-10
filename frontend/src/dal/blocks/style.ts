import { css } from 'styled-components';
import { COLORS } from 'src/components/theme';

import { ISectionData } from './section-interfaces';

export const getSectionStyle = (section?: Partial<ISectionData> | null) => {
  const targetSection = section || ({} as Partial<ISectionData>);
  const {
    backgroundType = 'color',
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
  const imageUrl = backgroundImage?.preview || backgroundImage?.src || '';
  const backgroundImageUrl = imageUrl ? ` url('/media/${imageUrl}'), ` : '';

  return css`
    ${backgroundType === 'transparent' && `background: transparent`};
    ${backgroundType === 'color' && `background: ${backgroundImageUrl}${backgroundColor}`};
    ${backgroundType === 'gradient' &&
    `background-image: ${backgroundImageUrl}${backgroundGradient}`};
    background-repeat: ${backgroundRepeat};
    background-size: ${backgroundSize || 'auto'};
    background-position: ${backgroundPosition || 'initial'};

    color: ${color};
  `;
};
