import { ChangeEvent, FocusEvent, FunctionComponent } from 'react';

export type TKind = 'primary' | 'secondary';
export type TDimension = 's' | 'm' | 'l';

export interface IInputProps {
  onChange(e: ChangeEvent): void;
  onBlur(e: FocusEvent<HTMLInputElement>): void;
  name: string;
}

export interface IProps extends IInputProps {
  id?: string;
  label?: string;
  error?: string;
  dimension?: TDimension;
  disabled?: boolean;
  [key: string]: any;
}
