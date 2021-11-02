import React from 'react';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';

import { IColumn, SortDirection, TID } from '../interfaces';

import {
  DefaultHeaderTableCellValueWrapper,
  DefaultHeaderTableCellValue,
  SortMarker,
} from './style';

interface IHeaderCellValueProps {
  column: IColumn;
  sortDirection: SortDirection;
  sortKey?: string;
  [key: string]: any;
}

export default function DefaultHeaderCell(props: IHeaderCellValueProps) {
  const { column, sortKey, sortDirection } = props;
  const value: TID = column.label || column.id;

  return (
    <DefaultHeaderTableCellValueWrapper isSortable={column.isSortable}>
      <DefaultHeaderTableCellValue hasWidth={!!column.width} title={value.toString()}>
        {value}
      </DefaultHeaderTableCellValue>
      {column.isSortable && (
        <SortMarker isActive={column.id === sortKey} direction={sortDirection}>
          <ArrowDropUp />
        </SortMarker>
      )}
    </DefaultHeaderTableCellValueWrapper>
  );
}
