import { IImage } from '../images/interfaces';

export interface IButtonData {
  id: number;
  label: string;
  description: string;
  type: string;
  value: string;
  kind: string;
  icon: IImage | null;
  backgroundColor: string;
  color: string;
  isVisible?: boolean;
}

export interface IButtonDataWrite {
  id?: number;
  label?: string;
  description?: string;
  type?: string;
  value?: string;
  kind?: string;
  icon?: number;
  backgroundColor?: string;
  color?: string;
}
