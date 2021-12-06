export type TDimension = 's' | 'm' | 'l' | 'xxl';

export interface IProps {
  value?: string; // цвет в HEX default value
  onChange?: (color: string) => void;
  dimension?: TDimension;
  [key: string]: any;
}
