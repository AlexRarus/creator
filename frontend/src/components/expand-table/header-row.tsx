import React from 'react';

import { IColumn, IHeaderRowProps, IRow, IRowAction } from './interfaces';
import Checkbox from './checkbox';
import ExpandButton from './expand-button';
import HeaderCell from './header-cell';
import RowActions from './row-actions';
import { TableRow, TableRowWrapper } from './style';

export default function HeaderRow<TRowData>(props: IHeaderRowProps<TRowData>) {
  const {
    hasExpandButton,
    row,
    columns,
    gap,
    actionsView,
    changeSort,
    sortKey,
    sortDirection,
    isSelecting,
    isSelected,
    selectRow,
    actionsRefCallback,
    canHideActions,
    actionsColumnWidth,
    CustomLabel,
    hasActions,
    commonData,
  } = props;

  const onSelectAllRows = () => {
    selectRow('all');
  };

  return (
    <TableRowWrapper>
      <TableRow
        hasSelectCheckbox={isSelecting}
        hasExpandButton={hasExpandButton}
        columns={columns}
        gap={gap}
        isHeader={true}
        canHideActions={canHideActions}
        actionsColumnWidth={actionsColumnWidth}
        hasActions={hasActions}
      >
        {isSelecting && (
          <Checkbox checked={isSelected} onChange={onSelectAllRows} isHeader={true} />
        )}
        {hasExpandButton && <ExpandButton isHeader={true} />}
        {columns.map((column: IColumn) => (
          <HeaderCell
            key={column.id}
            column={column}
            changeSort={changeSort}
            sortKey={sortKey}
            sortDirection={sortDirection}
            CustomLabel={CustomLabel}
            commonData={commonData}
          />
        ))}
        {actionsView === 'column' && Boolean(row?.actions?.length) && (
          <RowActions
            actions={row?.actions as IRowAction[]}
            row={row as IRow<TRowData>}
            actionsView={actionsView}
            isHide={true}
            isHeader={true}
            ref={actionsRefCallback}
          />
        )}
      </TableRow>
    </TableRowWrapper>
  );
}
