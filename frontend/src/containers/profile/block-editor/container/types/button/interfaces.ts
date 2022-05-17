import { IImage } from 'src/dal/images/interfaces';

import { AdditionalData } from '../../interfaces';

// поля формы
export interface FormInputs {
  label: string;
  description: string;
  type: IOption;
  value: string;
  kind?: string;
  icon?: IImage | null;
  backgroundColor: string;
  color: string;
  isVisible?: boolean;
}

export interface IOption {
  value: string;
  label: string;
  icon?: any;
}

// входные значение с формы создание
export interface RawData extends AdditionalData {
  formInputs: FormInputs;
}
