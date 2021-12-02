export type { ISetAvatar as DataForServer } from 'src/api/endpoints/auth';

// поля формы
export type FormInputs = {
  borderRadius: number;
  scale: number;
  rotate: number;
  sourceFile?: File;
};

// входные значение с формы создание
export interface RawData extends FormInputs {
  x: number;
  y: number;
  width: number;
  height: number;
  previewFile?: File;
  // нет на форме, но мы подставляем при отправке формы
}
