import { IOption } from 'src/components/select';

import { AdditionalData } from '../../interfaces';

export interface ICollapsedListItem {
  id: any;
  title?: string;
  description?: string;
}

// поля формы
export type FormInputs = {
  items?: ICollapsedListItem[];
};

// входные значение с формы создание
export interface RawData extends AdditionalData {
  formInputs: FormInputs;
}
