import { AdditionalData } from '../../interfaces';

// поля формы
export interface FormInputs {
  label: string;
  description: string;
  typeOption: {
    value: string;
    [key: string]: any;
  };
  value: string;
}

// входные значение с формы создание
export interface RawData extends AdditionalData {
  formInputs: FormInputs;
}

export interface DataToServer {
  label: string;
  description: string;
  type: string;
  value: string;
}
