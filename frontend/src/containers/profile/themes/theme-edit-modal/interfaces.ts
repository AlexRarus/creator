export type { IThemeWrite as DataForServer } from 'src/dal/themes/interface';

// поля формы
export type FormInputs = {
  background: string;
  color: string;
};

// входные значение с формы создание
export interface RawData {
  id?: number;
  formInputs: FormInputs;
}
