import { FocusEvent, FunctionComponent } from 'react';

export type TDimension = 's' | 'm' | 'l';

export interface IInputProps {
  name: string;
  value: any;
  onChange(value: string): void;
  onBlur(e: FocusEvent<HTMLInputElement>): void;
}

export interface IProps extends Partial<IInputProps> {
  id?: string;
  label?: string;
  error?: string;
  dimension?: TDimension;
  disabled?: boolean;
  type?: string;
  icon?: FunctionComponent;
  [key: string]: any;
}
