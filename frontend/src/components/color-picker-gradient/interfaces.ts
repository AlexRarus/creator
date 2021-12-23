import { FocusEvent } from 'react';

export type TDimension = 's' | 'm' | 'l' | 'xxl';
export type TKind = 'air' | 'formed' | string;

export interface IInputProps {
  name: string;
  value: string; // ожидается строка следующего вида "linear-gradient(to left, #000, #ffffff, #eee, #red)" (колличество цветов произвольное)
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
  kind?: TKind;
  placeholder?: string;
  fontSizeInherit?: boolean;
  fontWeight?: string;
  autoFocus?: boolean;
  defaultColors?: string[];
  [key: string]: any;
}
