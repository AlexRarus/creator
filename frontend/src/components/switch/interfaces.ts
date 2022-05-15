import { FocusEvent } from 'react';

export type TDimension = 's' | 'm' | 'l' | 'xxl';
export type TKind = 'air' | 'formed' | string;

export interface IInputProps {
  name: string;
  value: any;
  onChange(value: any): void;
  onBlur(e: FocusEvent<HTMLInputElement>): void;
}

export interface IProps extends Partial<IInputProps> {
  id?: string;
  children?: any; // label
  disabled?: boolean;
  labelPosition?: 'left' | 'right';
  justify?: 'flex-start' | 'flex-end' | 'space-between';
  [key: string]: any;
}
