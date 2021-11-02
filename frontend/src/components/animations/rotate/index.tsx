import React from 'react';

import useCommonAnimationProps from '../useCommonAnimationProps';

import { IProps } from './interfaces';
import { RotateElement } from './style';

export const Rotate = React.forwardRef((props: IProps, ref: any) => {
  const { children, ...animationProps } = useCommonAnimationProps<IProps>(props);

  return (
    <RotateElement {...animationProps} ref={ref}>
      {children}
    </RotateElement>
  );
});

Rotate.displayName = 'Rotate';
