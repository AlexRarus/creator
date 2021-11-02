import React, { ReactNode } from 'react';

export type TID = string | number;

export interface ICustomLabelProps {
  column: IColumn;
  sortKey: string | undefined;
  sortDirection: SortDirection;
  commonData?: any;
}
export interface IExpandContentProps<TRowData> {
  row: IRow<TRowData>;
  isSelected: boolean;
}
export interface ICustomCellProps {
  column: IColumn;
  row: IRow<any>;
  isExpand: boolean;
  isSelected: boolean;
  isHoverRow: boolean;
  commonData?: any;
}
export interface IExpandTableProps<TRowData> {
  rows: IRow<TRowData>[]; // массив строк таблицы
  columns?: IColumn[]; // колоноки таблицы
  sortKey?: string; // колонка по которой отсортрован список
  sortDirection?: SortDirection; // направление сортировки
  gap?: number; // промежуток между колонками в пикселях
  actionsView?: TActionsView; // отображение экшенов spread - распределенное, rest - собраны в выпадающий список под одной кнопкой
  canHideActions?: boolean; // показывать кнопку экшенов по hover или всегда
  emptyListMessage?: string; // сообщение при пустом списке
  className?: string; // можно стилизовать при помощи className и styled-components
  minHeight?: string; // можно передать высоту через height или стилизовать при помощи className и styled-components
  height?: string; // можно передать высоту через height или стилизовать при помощи className и styled-components
  isLoadingData?: boolean; // когда закончится загрузка данных будет вызвана проверка на достяжение низа таблицы (нужно ли загружать еще)
  isMultiExpand?: boolean; // возможность "раскрывать" одновременно несколько строк
  refreshKey?: string; // можно передать например "фильтр" в виде строки при изменении которого будет обновляться таблица
  isSelecting?: boolean; // возможность выбирать элементы (чекбоксы)
  isHighlight?: boolean; // подсветка строк при наведении на них курсора
  resetOnRemove?: boolean; // сбрасывать выделение и раскрытые строки если удалили одну или несколько строк
  canScroll?: boolean; // можно ли скроллить таблицу
  resetOnAdd?: boolean; // сбрасывать выделение и раскрытые строки если добавили одну или несколько строк
  resetOnChange?: boolean; // сбрасывать выделение и раскрытые строки если изменили одну или несколько строк
  onChangeSelect?(selectedRows: IRow<TRowData>[]): void; // вызывается когда изменяется выбор строк, возвращает массив выбранных
  getSelectedRowIds?(ids: TID[]): void; // вызывается когда изменяется выбор строк, возвращает массив id строк
  cellValueStringify?(column: IColumn, row: IRow<TRowData>): string;
  onChangeSort?(sortKey: string, sortDirection: SortDirection): any; // обработчик изменения сортировки
  onActionClick?(actionId: TID, row: IRow<TRowData>): void; // обработчик клика по экшену
  onReachEnd?(): void; // вызывается когда скролл в таблице достигает последнего элемента списка
  onRowClick?(row: IRow<TRowData>): void; // клик на строку
  commonData?: any; // любая информация которая будет доступна при рендере любой ячейки

  // react components
  CustomLabel?: React.FC<ICustomLabelProps>; // рендер заголовка колонки
  ExpandContent?: React.FC<IExpandContentProps<TRowData>>; // рендер расширяющейся (окрывающейся) области под каждой строкой
}

export enum SortDirection {
  desc = 'DESC',
  asc = 'ASC',
}

export interface IColumn {
  id: TID; // id колонки
  label?: string;
  dataId?: string; // поле в данных которое будет выведено в этой колонке (по умолчанию совпадающее с id колонки)
  isSortable?: boolean;
  width?: string; // ширина колонки по умолчанию 'auto'
  hasTooltip?: boolean;
  isResetStyleColumn?: boolean; // сбрасываем дефолтные стили ячейки ( padding )

  // react components
  CustomCell?: React.FC<ICustomCellProps>;
}

export interface IRow<TRowData> {
  id: TID;
  data: TRowData;
  canExpand?: boolean;
  isActive?: boolean;
  actions?: IRowAction[];
  [key: string]: any;
}

export interface IRowAction {
  id: TID;
  label?: ReactNode | string;
  icon?: React.FC<any>;
  iconSize?: number;
  tooltip?: string;
}

export type TActionsView = 'rest' | 'spread' | 'column'; // 1) собраны под кнопкой, 2) список иконок, 3) отрендерить отдельную колонку под кнопки

export interface IHeaderRowProps<TRowData> {
  row?: IRow<TRowData>;
  columns: IColumn[];
  hasExpandButton: boolean;
  changeSort(columnId: TID): void;
  sortDirection: SortDirection;
  actionsRefCallback: any;
  actionsColumnWidth: number;
  isSelecting: boolean;
  isSelected: boolean;
  selectRow(rowId: 'all'): void;
  hasActions: boolean;
  sortKey?: string;
  gap?: number;
  actionsView?: TActionsView;
  canHideActions?: boolean;
  commonData?: any;

  // react components
  CustomLabel?: React.FC<ICustomLabelProps>; // рендер заголовка колонки
}

export interface IRowProps<TRowData> {
  row: IRow<TRowData>;
  columns: IColumn[];
  expandRow(rowId: TID): void;
  isExpand: boolean;
  actionsColumnWidth: number;
  hasSelectedRows: boolean;
  isSelecting: boolean;
  isSelected: boolean;
  isHighlight: boolean;
  selectRow(rowId: TID): void;
  hasActions: boolean;
  gap?: number;
  actionsView?: TActionsView;
  canHideActions?: boolean;
  cellValueStringify?(column: IColumn, row: IRow<TRowData>): string;
  onActionClick?(actionId: TID, row: IRow<TRowData>): void;
  onClick?(row: IRow<TRowData>): void;
  commonData?: any;

  // react components
  ExpandContent?: React.FC<IExpandContentProps<TRowData>>;
}

export interface IHeaderCellProps {
  column: IColumn;
  changeSort(columnId: TID): void;
  sortDirection: SortDirection;
  sortKey?: string;
  commonData?: any;

  // react components
  CustomLabel?: React.FC<ICustomLabelProps>; // рендер заголовка колонки
}

export interface ICellProps<TRowData> {
  column: IColumn;
  row: IRow<TRowData>;
  isExpand: boolean;
  isHoverRow: boolean;
  isSelected: boolean;
  tooltipValue?: string[];
  cellValueStringify?(column: IColumn, row: IRow<TRowData>): string;
  commonData?: any;
}
