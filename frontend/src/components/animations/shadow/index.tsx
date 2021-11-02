import React from 'react';

import useCommonAnimationProps from '../useCommonAnimationProps';

import { IProps } from './interfaces';
import { ShadowElement } from './style';

export const Shadow = React.forwardRef((props: IProps, ref: any) => {
  const { children, ...animationProps } = useCommonAnimationProps<IProps>(props);

  return (
    <ShadowElement {...animationProps} ref={ref}>
      {children}
    </ShadowElement>
  );
});

Shadow.displayName = 'Shadow';
