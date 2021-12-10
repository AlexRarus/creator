import { TDimension } from 'src/components/input-components';

export interface IOption {
  label: any;
  value: any;
}

export interface IProps {
  value?: any;
  options: IOption[];
  onChange?(value: any): void;
  maxMenuHeight?: number;
  menuWidth?: number;
  dimension?: TDimension;
  width?: string;
  className?: string;
  [key: string]: any;
}

export interface IOptionsProps {
  componentWidth?: number;
}

export interface IOptionProps {
  isActive: boolean;
}
