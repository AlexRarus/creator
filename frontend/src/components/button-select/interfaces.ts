export type TDimension = 's' | 'm' | 'l' | 'xl' | 'xxl';
export type TKind = 'air' | 'formed' | string;

export interface IOption {
  label: any;
  value: any;
  icon?: any;
}

export interface IProps {
  value?: IOption | any;
  options: IOption[];
  onChange?(value: any): void;
  maxMenuHeight?: number;
  menuWidth?: number;
  dimension?: TDimension;
  kind?: TKind;
  width?: string;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}

export interface IOptionsProps {
  componentWidth?: number;
}

export interface IPropsStyles {
  dimension?: TDimension;
  kind?: TKind;
  disabled?: boolean;
  width?: string;
  theme?: any;
}

export interface IOptionProps extends IPropsStyles {
  isActive: boolean;
}
