import { FocusEvent, FunctionComponent } from 'react';

export type TDimension = 's' | 'm' | 'l';

export interface IInputProps {
  name: string;
  value: any;
  onChange(e: any): void;
  onBlur(e: FocusEvent<HTMLInputElement>): void;
}

export interface IProps extends IInputProps {
  label?: string;
  error?: string;
  dimension?: TDimension;
  disabled?: boolean;
  type?: string;
  icon?: FunctionComponent;
  autoFocus?: boolean;
  onResize?: () => void;
  [key: string]: any;
}
