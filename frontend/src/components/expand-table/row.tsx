import React, { useState, useCallback } from 'react';

import Checkbox from '../checkbox';

import RowActions from './row-actions';
import ExpandButton from './expand-button';
import { Cell } from './cell';
import { IColumn, IRowProps } from './interfaces';
import { TableRowWrapper, TableRow, ExpandContentWrapper } from './style';

export default function Row<TRowData>(props: IRowProps<TRowData>) {
  const {
    row,
    columns,
    expandRow,
    isExpand,
    gap,
    hasSelectedRows,
    isSelecting,
    isSelected,
    isHighlight,
    selectRow,
    actionsView,
    canHideActions,
    actionsColumnWidth,
    ExpandContent,
    cellValueStringify,
    onActionClick,
    onClick,
    hasActions,
    commonData,
  } = props;
  const { id, canExpand = false, actions = [] } = row;
  const [isHover, setHover] = useState(false);

  const onChangeExpand = useCallback(() => {
    if (canExpand) {
      expandRow(id);
    }
  }, [expandRow, canExpand, id]);

  const onSelectRow = () => {
    selectRow(row.id);
  };

  const onRowClick = useCallback(() => {
    onClick && onClick(row);
  }, [row]);

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, [row]);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, [row]);

  return (
    <TableRowWrapper>
      <TableRow
        key={id}
        hasSelectCheckbox={isSelecting}
        hasExpandButton={canExpand}
        columns={columns}
        gap={gap}
        isExpand={isExpand}
        isSelected={isSelected}
        isHighlight={isHighlight}
        canHideActions={canHideActions}
        hasSelectedRows={hasSelectedRows}
        actionsColumnWidth={actionsColumnWidth}
        onClick={onRowClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        hasActions={hasActions}
      >
        {isSelecting && <Checkbox checked={isSelected} onChange={onSelectRow} />}
        {canExpand && <ExpandButton isExpand={isExpand} onClick={onChangeExpand} />}
        {Boolean(actions?.length) && (
          <RowActions
            actions={actions}
            row={row}
            onClick={onActionClick}
            actionsView={actionsView}
            canHideActions={canHideActions}
            isHide={isExpand}
          />
        )}
        {columns.map((column: IColumn) => (
          <Cell
            key={`${id}-${column.id}`}
            column={column}
            row={row}
            isHoverRow={isHover}
            isExpand={isExpand}
            isSelected={isSelected}
            cellValueStringify={cellValueStringify}
            commonData={commonData}
          />
        ))}
      </TableRow>
      <ExpandContentWrapper>
        {isExpand && ExpandContent ? <ExpandContent row={row} isSelected={isSelected} /> : ''}
      </ExpandContentWrapper>
    </TableRowWrapper>
  );
}
