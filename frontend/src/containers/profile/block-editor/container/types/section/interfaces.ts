import { AdditionalData } from '../../interfaces';

// поля формы
export interface FormInputs {
  label: string;
  background: string;
  borderRadius: string;
  paddingTop: string;
  paddingBottom: string;
  paddingRight: string;
  paddingLeft: string;
}

// входные значение с формы создание
export interface RawData extends AdditionalData {
  formInputs: FormInputs;
  blocks: number[]; // на форме нет, но мы передаем при создании
}

export interface DataToServer extends FormInputs {
  blocks: number[]; // на форме нет, но мы передаем при создании
}
