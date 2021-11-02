import React, { forwardRef, ReactNode } from 'react';

import { GridColumn as GridColumnStyled } from './style';
import { IGridColumnProps } from './interfaces';

interface IGridColumnComponentProps extends Omit<IGridColumnProps, 'index'> {
  children?: ReactNode;
  className?: string;
}

export const GridColumn = forwardRef((props: IGridColumnComponentProps, ref: any) => {
  const { children, ...otherProps } = props;

  return (
    <GridColumnStyled ref={ref} {...otherProps}>
      {children}
    </GridColumnStyled>
  );
});

GridColumn.displayName = 'GridColumn';
