import React from 'react';

import useCommonAnimationProps from '../useCommonAnimationProps';

import { IProps } from './interfaces';
import { DiagonalSlideElement } from './style';

export const DiagonalSlide = React.forwardRef((props: IProps, ref: any) => {
  const { children, ...animationProps } = useCommonAnimationProps<IProps>(props);

  return (
    <DiagonalSlideElement {...animationProps} ref={ref}>
      {children}
    </DiagonalSlideElement>
  );
});

DiagonalSlide.displayName = 'DiagonalSlide';
