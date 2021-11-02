import React, { useCallback, useEffect, useState } from 'react';

import HeaderRow from './header-row';
import TableBody from './table-body';
import Row from './row';
import { IExpandTableProps, IColumn, IRow, SortDirection, TID } from './interfaces';
import createColumnsFromData from './utils/createColumnsFromData';
import useElementMetricsTable, { IMetrics } from './utils/useElementMetricsTable';
import usePreviousTable from './utils/usePreviousTable';
import { TableWrapper, TableHead, DefaultEmptyListMessage } from './style';

export default function ExpandTable<TRowData>(props: IExpandTableProps<TRowData>) {
  const {
    rows = [],
    columns: initColumns,
    sortKey: initSortKey,
    sortDirection: initSortDirection,
    gap,
    actionsView = 'column',
    emptyListMessage = 'Нет элементов',
    className,
    minHeight = 'auto',
    height,
    isLoadingData,
    isMultiExpand = false,
    canHideActions = true,
    canScroll = false,
    refreshKey,
    isSelecting = false,
    isHighlight = true,
    resetOnRemove = true,
    resetOnAdd = false,
    resetOnChange = true,
    onChangeSelect,
    getSelectedRowIds,
    CustomLabel,
    ExpandContent,
    onChangeSort,
    onActionClick,
    onReachEnd,
    onRowClick,
    commonData,
  } = props;
  const [rowWithMostActions, setRowWithMostActions] = useState<IRow<TRowData> | undefined>(
    rows.length
      ? rows.reduce((resultRow: IRow<TRowData>, targetRow: IRow<TRowData>) => {
          const targetActions = targetRow.actions || [];
          const resultActions = resultRow.actions || [];
          return targetActions.length > resultActions.length ? targetRow : resultRow;
        })
      : undefined
  );
  const [actionsElement, actionsRefCallback] = useState<HTMLElement | null>(null);
  const { width: actionsColumnWidth }: IMetrics = useElementMetricsTable(actionsElement, {
    isResizeObserve: true,
  });
  const hasActions = Boolean(rowWithMostActions?.actions?.length);

  const [columns, setColumns] = useState<IColumn[]>(
    initColumns || createColumnsFromData(rowWithMostActions?.data)
  );
  const [sortKey, setSortKey] = useState<string | undefined>(initSortKey);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    initSortDirection || SortDirection.asc
  );
  const [hasExpandButton, setHasExpandButton] = useState(
    rows.some((row: IRow<TRowData>) => row.canExpand)
  );
  const [expandRowIds, setExpandRowIds] = useState<TID[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<TID[]>([]);
  const prevRowsContent = usePreviousTable(JSON.stringify(rows));
  const prevRowsLength = usePreviousTable(rows.length);
  const prevSelectedRowIdsLength = usePreviousTable(selectedRowIds.length);
  const rowIds: TID[] = rows.length ? rows.map((row: IRow<TRowData>) => row.id) : [];
  const isSelectedAll: boolean = !!rowIds.length && selectedRowIds.join() === rowIds.join();

  useEffect(() => {
    if (rows.length) {
      setHasExpandButton(rows.some((row: IRow<TRowData>) => row.canExpand));
      setRowWithMostActions(
        rows.reduce((resultRow: IRow<TRowData>, targetRow: IRow<TRowData>) => {
          const targetActions = targetRow.actions || [];
          const resultActions = resultRow.actions || [];
          return targetActions.length > resultActions.length ? targetRow : resultRow;
        })
      );
    }
  }, [rows]);

  useEffect(() => {
    const isRemove = prevRowsLength > rows.length;
    const isAdd = prevRowsLength < rows.length;
    const isChange = prevRowsLength === rows.length && prevRowsContent !== JSON.stringify(rows);

    if ((isRemove && resetOnRemove) || (isAdd && resetOnAdd) || (isChange && resetOnChange)) {
      setExpandRowIds([]);
      setSelectedRowIds([]);
    }
  }, [JSON.stringify(rows), rows.length, resetOnRemove, resetOnAdd, resetOnChange]);

  useEffect(() => {
    if (initColumns?.length) {
      setColumns([...initColumns]);
    }
  }, [initColumns?.length]);

  useEffect(() => {
    // если IRow<TRowData> есть свойство isActive, то проставляем активные строки
    const activeRows = rows
      .map((row: IRow<TRowData>) => (row.isActive ? row.id : null))
      .filter((row) => row !== null) as TID[];

    setExpandRowIds([]);
    setSelectedRowIds(activeRows);
  }, [refreshKey]);

  useEffect(() => {
    // при изменениии выбора строк вызывать коллбэк если он есть
    if (selectedRowIds.length !== prevSelectedRowIdsLength) {
      onChangeSelect &&
        onChangeSelect(rows.filter((row: IRow<TRowData>) => selectedRowIds.includes(row.id)));

      getSelectedRowIds && getSelectedRowIds(selectedRowIds);
    }
  }, [selectedRowIds.length, prevSelectedRowIdsLength]);

  useEffect(() => {
    if (!columns.length) {
      console.warn('columns is empty');
    }
  }, [columns.length]);

  const changeSort = (columnId: string) => {
    let direction: SortDirection = SortDirection.asc;

    // если нажали на колонку по которой уже была сортировка - разворачиваем сортировку
    if (sortKey === columnId) {
      switch (sortDirection) {
        case SortDirection.desc:
          direction = SortDirection.asc;
          break;
        case SortDirection.asc:
          direction = SortDirection.desc;
          break;
      }
    }

    setSortDirection(direction);
    setSortKey(columnId);
    onChangeSort && onChangeSort(columnId, direction);
  };

  const expandRow = useCallback(
    (rowId: string) => {
      if (expandRowIds.includes(rowId)) {
        // если уже есть такой id - убираем его
        setExpandRowIds(expandRowIds.filter((id: TID) => id !== rowId));
      } else if (isMultiExpand) {
        // если нет id в массиве - добавляем
        setExpandRowIds([...expandRowIds, rowId]);
      } else {
        // если нельзя открывать несколько элементов, оставляем только текущий
        setExpandRowIds([rowId]);
      }
    },
    [expandRowIds, isMultiExpand]
  );

  const selectRow = useCallback(
    (rowId: TID) => {
      let nextSelectedRowIds: TID[] = [];

      if (rowId === 'all') {
        if (isSelectedAll) {
          // если уже были выбраны все элементы
          nextSelectedRowIds = [];
        } else {
          nextSelectedRowIds = [...rowIds];
        }
      } else if (selectedRowIds.includes(rowId)) {
        // если уже есть такой id - убираем его
        nextSelectedRowIds = selectedRowIds.filter((id: TID) => id !== rowId);
      } else {
        // если нет id в массиве - добавляем
        nextSelectedRowIds = [...selectedRowIds, rowId];
      }

      setSelectedRowIds(nextSelectedRowIds);
    },
    [selectedRowIds, isSelectedAll, rowIds]
  );

  return (
    <TableWrapper className={className} height={height}>
      <TableHead>
        {Boolean(columns.length) && (
          <HeaderRow
            hasExpandButton={hasExpandButton}
            row={rowWithMostActions}
            columns={columns}
            gap={gap}
            actionsView={actionsView}
            changeSort={changeSort}
            sortKey={sortKey}
            sortDirection={sortDirection}
            actionsRefCallback={actionsRefCallback}
            isSelecting={isSelecting}
            isSelected={isSelectedAll}
            selectRow={selectRow}
            canHideActions={canHideActions}
            CustomLabel={CustomLabel}
            actionsColumnWidth={actionsColumnWidth}
            hasActions={hasActions}
            commonData={commonData}
          />
        )}
      </TableHead>
      <TableBody
        minHeight={minHeight}
        onReachEnd={onReachEnd}
        isLoadingData={isLoadingData}
        canScroll={canScroll}
        refreshKey={refreshKey}
      >
        {rows.length ? (
          rows.map((row: IRow<TRowData>) => (
            <Row
              key={row.id}
              row={row}
              columns={columns}
              expandRow={expandRow}
              isExpand={expandRowIds.includes(row.id)}
              gap={gap}
              actionsView={actionsView}
              canHideActions={canHideActions}
              hasSelectedRows={Boolean(selectedRowIds.length)}
              isSelecting={isSelecting}
              isSelected={selectedRowIds.includes(row.id)}
              isHighlight={isHighlight}
              selectRow={selectRow}
              ExpandContent={ExpandContent}
              onActionClick={onActionClick}
              actionsColumnWidth={actionsColumnWidth}
              onClick={onRowClick}
              hasActions={hasActions}
              commonData={commonData}
            />
          ))
        ) : (
          <DefaultEmptyListMessage>{emptyListMessage}</DefaultEmptyListMessage>
        )}
      </TableBody>
    </TableWrapper>
  );
}
