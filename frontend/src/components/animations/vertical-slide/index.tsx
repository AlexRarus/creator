import React from 'react';

import useCommonAnimationProps from '../useCommonAnimationProps';

import { IProps } from './interfaces';
import { VerticalSlideElement } from './style';

export const VerticalSlide = React.forwardRef((props: IProps, ref: any) => {
  const { children, ...animationProps } = useCommonAnimationProps<IProps>(props);

  return (
    <VerticalSlideElement {...animationProps} ref={ref}>
      {children}
    </VerticalSlideElement>
  );
});

VerticalSlide.displayName = 'VerticalSlide';
