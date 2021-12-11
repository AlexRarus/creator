import { FocusEvent, FunctionComponent } from 'react';

export type TDimension = 's' | 'm' | 'l' | 'xxl';
export type TKind = 'air' | 'formed' | string;

export interface IInputProps {
  name: string;
  value: any;
  onChange(value: string): void;
  onBlur(e: FocusEvent<HTMLInputElement>): void;
}

export interface IProps extends Partial<IInputProps> {
  id?: string;
  mask?: string;
  label?: string;
  error?: string;
  dimension?: TDimension;
  disabled?: boolean;
  type?: string;
  kind?: TKind;
  icon?: FunctionComponent;
  placeholder?: string;
  [key: string]: any;
}
