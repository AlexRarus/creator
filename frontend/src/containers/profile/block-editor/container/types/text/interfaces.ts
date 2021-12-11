import { AdditionalData } from '../../interfaces';

// поля формы
export type FormInputs = {
  text?: string;
};

// входные значение с формы создание
export interface RawData extends AdditionalData {
  formInputs: FormInputs;
}
