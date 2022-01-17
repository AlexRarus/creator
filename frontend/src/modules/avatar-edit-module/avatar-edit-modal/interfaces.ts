export type { ISetAvatar as DataForServer } from 'src/api/endpoints/auth';

// поля формы
export type FormInputs = {
  borderRadiusPercent: number;
  scalePercent: number;
  rotate: number;
  sourceFile?: File;
};

// входные значение с формы создание
export interface RawData extends Partial<FormInputs> {
  x: number;
  y: number;
  width: number;
  height: number;
  previewFile?: File;
  borderRadius: number;
  scale: number;
  // нет на форме, но мы подставляем при отправке формы
}
