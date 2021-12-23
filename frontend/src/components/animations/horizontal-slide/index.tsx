import React from 'react';

import useCommonAnimationProps from '../useCommonAnimationProps';

import { IProps } from './interfaces';
import { HorizontalSlideElement } from './style';

export const HorizontalSlide = React.forwardRef((props: IProps, ref: any) => {
  const { children, ...animationProps } = useCommonAnimationProps<IProps>(props);

  return (
    <HorizontalSlideElement {...animationProps} ref={ref}>
      {children}
    </HorizontalSlideElement>
  );
});

HorizontalSlide.displayName = 'HorizontalSlide';
