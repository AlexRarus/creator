import { ITheme, TGridSize, IGridBreakPoints } from 'src/components/theme/interfaces';

export interface IGridProps {
  sizeColumns: TGridSize[];
  gap?: number; // в пикселях - расстояние между соседними колонками
  verticalGap?: number; // в пикселях - расстояние между соседними строками
  theme?: Partial<ITheme>;
  breakPoints?: IGridBreakPoints; // расположение колонок на разных mediaQuery (по-молчанию ./utils defaultBreakPoints)
  staticSize?: TGridSize; // если установлен, то грид НЕ будет перестраиваться по mediaQuery
  alignItems?: 'start' | 'end'; // default start
}

export interface IGridColumnProps extends IAlign {
  size?: TGridSize; // ширина внутри грида в колонках по умолчанию 12 (100%)
  index?: number; // порядковый номер колонки (подставляется автоматически)
  direction?: string;
}

export interface IAlign {
  justifyContent?: string;
  alignItems?: string;
}
