import React from 'react';

import useCommonAnimationProps from '../useCommonAnimationProps';

import { IProps } from './interfaces';
import { MoveElement } from './style';

export const Move = React.forwardRef((props: IProps, ref: any) => {
  const { children, ...animationProps } = useCommonAnimationProps<IProps>(props);

  return (
    <MoveElement {...animationProps} ref={ref}>
      {children}
    </MoveElement>
  );
});

Move.displayName = 'Move';
