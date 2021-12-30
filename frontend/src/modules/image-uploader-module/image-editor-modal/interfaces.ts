export type { IWriteImage as DataForServer } from 'src/api/endpoints/images';

// поля формы
export type FormInputs = {
  borderRadius: number;
  scale: number;
  rotate: number;
  borderX: number;
  borderY: number;
};

// входные значение с формы создание
export interface RawData extends FormInputs {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  previewFile?: File;
  // нет на форме, но мы подставляем при отправке формы
}
