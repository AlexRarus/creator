import { IOption } from 'src/components/select';

import { AdditionalData } from '../../interfaces';

export interface IListItem {
  id: any;
  title?: string;
  description?: string;
  icon?: IListItemIcon;
}

export interface IListItemIcon {
  id: number;
  src: string;
}

// поля формы
export type FormInputs = {
  iconSize?: string;
  fontSize?: IOption;
  template?: IOption;
  items?: IListItem[];
  isVisible?: boolean;
};

// входные значение с формы создание
export interface RawData extends AdditionalData {
  formInputs: FormInputs;
}
