import { Props } from 'react-select';

export type TDimension = 's' | 'm' | 'l';

export interface IProps extends Props {
  name?: string;
  value?: any;
  onChange?(selectValue: any): void;
  onBlur?(): void;

  placeholder?: string;
  debounceTime?: number;
  minMenuHeight?: number;
  maxMenuHeight?: number;
  dimension?: TDimension;
  onInputChange?: (value: string) => void;
  isMulti?: any;
  [key: string]: any;
}

export interface IOption {
  label: string;
  value: string;
  [key: string]: any;
}
