import { AdditionalData } from '../../interfaces';

// поля формы
export type FormInputs = {
  dimension?: string;
  isVisible?: boolean;
};

// входные значение с формы создание
export interface RawData extends AdditionalData {
  formInputs: FormInputs;
}
