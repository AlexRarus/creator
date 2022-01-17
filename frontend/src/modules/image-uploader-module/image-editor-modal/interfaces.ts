export type { IWriteImage as DataForServer } from 'src/api/endpoints/images';

// поля формы
export type FormInputs = {
  borderRadiusPercent: number;
  scalePercent: number;
  rotate: number;
  width: number;
  height: number;
  // borderX: number;
  // borderY: number;
};

// входные значение с формы создание
export interface RawData extends Partial<FormInputs> {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
  scale: number;
  borderX: number;
  borderY: number;
  previewFile?: File;
  // нет на форме, но мы подставляем при отправке формы
}
