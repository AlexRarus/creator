import React from 'react';

import useCommonAnimationProps from '../useCommonAnimationProps';

import { IProps } from './interfaces';
import { AppearElement } from './style';

export const Appear = React.forwardRef((props: IProps, ref: any) => {
  const { children, ...animationProps } = useCommonAnimationProps<IProps>(props);

  return (
    <AppearElement {...animationProps} ref={ref}>
      {children}
    </AppearElement>
  );
});

Appear.displayName = 'Appear';
