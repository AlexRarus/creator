import React, { useCallback } from 'react';

import { IHeaderCellProps } from '../interfaces';
import { TableCell } from '../style';

import DefaultHeaderCell from './default-value';

export default function HeaderCell(props: IHeaderCellProps) {
  const { column, changeSort, sortKey, sortDirection, CustomLabel, commonData } = props;

  const onChangeSort = useCallback(() => {
    column.isSortable && changeSort(column.id);
  }, [column.isSortable, column.id, sortKey, sortDirection]);

  return (
    <TableCell key={column.id} isHeader={true} onClick={onChangeSort}>
      {CustomLabel ? (
        <CustomLabel
          column={column}
          sortKey={sortKey}
          sortDirection={sortDirection}
          commonData={commonData}
        />
      ) : (
        <DefaultHeaderCell column={column} sortKey={sortKey} sortDirection={sortDirection} />
      )}
    </TableCell>
  );
}
