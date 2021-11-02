import { format } from 'date-fns';
import isValid from 'date-fns/isValid';

import { IColumn, IRow } from '../interfaces';

export default function defaultStringifyValue(column: IColumn, row: IRow<any>): string {
  const key = column.dataId || (column.id as string);
  const deepKey: string[] = key.split('.');
  const value = deepKey.reduce(
    (result: any, targetKey: string) => result && result[targetKey],
    row.data
  );

  // если value undefined, оставляем клетку пустой
  if (value === undefined) {
    return '';
  }
  switch (column.id) {
    case 'date':
      return value && isValid(new Date(value)) ? format(new Date(value), 'dd.MM.yyyy') : value;
    default:
      return `${value}`;
  }
}
