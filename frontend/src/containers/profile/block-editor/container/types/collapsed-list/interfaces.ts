import { AdditionalData } from '../../interfaces';

export interface ICollapsedListItem {
  id: any;
  title?: string;
  description?: string;
}

// поля формы
export type FormInputs = {
  items?: ICollapsedListItem[];
  isVisible?: boolean;
};

// входные значение с формы создание
export interface RawData extends AdditionalData {
  formInputs: FormInputs;
}
