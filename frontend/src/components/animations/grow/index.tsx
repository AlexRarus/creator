import React from 'react';

import useCommonAnimationProps from '../useCommonAnimationProps';

import { IProps } from './interfaces';
import { GrowElement } from './style';

export const Grow = React.forwardRef((props: IProps, ref: any) => {
  const { children, ...animationProps } = useCommonAnimationProps<IProps>(props);

  return (
    <GrowElement {...animationProps} ref={ref}>
      {children}
    </GrowElement>
  );
});

Grow.displayName = 'Grow';
