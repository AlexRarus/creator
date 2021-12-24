import { COLORS } from 'src/components/theme';

import { ISectionData } from './section-interfaces';

export const getSectionBackground = (section?: Partial<ISectionData> | null) => {
  const targetSection = section || ({} as Partial<ISectionData>);
  const {
    backgroundType,
    backgroundColor = COLORS.white,
    backgroundGradient,
    backgroundImage,
    // backgroundRepeat,
    // backgroundSmooth,
  } = targetSection;
  const backgroundPrefix = backgroundType === 'color' ? backgroundColor : backgroundGradient;
  return `${backgroundPrefix}${backgroundImage ? ` url('/media/${backgroundImage.src}')` : ''}`;
};
