import { AdditionalData } from '../../interfaces';
import { IImage } from 'src/dal/images/interfaces';
export type { ISectionDataWrite as DataToServer } from 'src/dal/blocks/section-interfaces';
import { IOption } from 'src/components/select';

// поля формы
export interface FormInputs {
  label?: string;
  backgroundType?: IOption; // есть только на форме
  backgroundColor?: string; // есть только на форме
  backgroundGradient?: string; // есть только на форме
  backgroundImage?: IImage;
  borderRadius?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingRight?: string;
  paddingLeft?: string;
}

// входные значение с формы создание
export interface RawData extends AdditionalData {
  formInputs: FormInputs;
  blocks: number[]; // на форме нет, но мы передаем при создании
}
