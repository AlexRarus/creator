import React from 'react';

import { ICellProps } from '../interfaces';
import { TableCell } from '../style';

import { DefaultCell } from './default-value';

export function Cell<TRowData>(props: ICellProps<TRowData>) {
  const {
    column,
    row,
    isExpand,
    isSelected,
    isHoverRow,
    cellValueStringify,
    tooltipValue,
    commonData,
  } = props;
  const { CustomCell } = column;

  return (
    <TableCell>
      {CustomCell ? (
        <CustomCell
          column={column}
          row={row}
          isExpand={isExpand}
          isSelected={isSelected}
          isHoverRow={isHoverRow}
          commonData={commonData}
        />
      ) : (
        <DefaultCell
          column={column}
          row={row}
          isExpand={isExpand}
          cellValueStringify={cellValueStringify}
          tooltipValue={tooltipValue}
        />
      )}
    </TableCell>
  );
}
