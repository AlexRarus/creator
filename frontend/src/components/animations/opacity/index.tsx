import React from 'react';

import useCommonAnimationProps from '../useCommonAnimationProps';

import { IProps } from './interfaces';
import { OpacityElement } from './style';

export const Opacity = React.forwardRef((props: IProps, ref: any) => {
  const { children, ...animationProps } = useCommonAnimationProps<IProps>(props);

  return (
    <OpacityElement {...animationProps} ref={ref}>
      {children}
    </OpacityElement>
  );
});

Opacity.displayName = 'Opacity';
