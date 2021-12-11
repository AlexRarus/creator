import { AdditionalData } from '../../interfaces';

// поля формы
export type FormInputs = {
  dimension?: string;
};

// входные значение с формы создание
export interface RawData extends AdditionalData {
  formInputs: FormInputs;
}
