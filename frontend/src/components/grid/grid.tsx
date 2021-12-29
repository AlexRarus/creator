import React, { forwardRef, ReactNode, useRef } from 'react';

import { Grid as GridStyled } from './style';
import { IGridProps } from './interfaces';

interface IGridComponentProps extends Omit<IGridProps, 'sizeColumns'> {
  children: ReactNode;
  className?: string;
}

export const Grid = forwardRef((props: IGridComponentProps, ref: any) => {
  const { children, ...otherProps } = props;
  const asArray = React.Children.toArray(children);
  const sizeColumns = asArray.map((item: any) => item.props.size || 12);
  const refValidElementIndex = useRef(0);
  refValidElementIndex.current = 0;

  const childrenWithIndex = React.Children.map(children, (child: ReactNode) => {
    if (React.isValidElement(child)) {
      const index = (refValidElementIndex.current += 1);
      return React.cloneElement(child, { index });
    }
    return child;
  });

  return (
    <GridStyled ref={ref} {...otherProps} sizeColumns={sizeColumns}>
      {childrenWithIndex}
    </GridStyled>
  );
});

Grid.displayName = 'Grid';
