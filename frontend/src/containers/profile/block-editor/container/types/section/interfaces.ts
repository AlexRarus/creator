import { AdditionalData } from '../../interfaces';
import { IImage } from 'src/dal/images/interfaces';
import { IOption } from 'src/components/select';

// поля формы
export interface FormInputs {
  label?: string;
  backgroundType?: IOption;
  backgroundColor: string;
  backgroundGradient: string;
  backgroundImage?: IImage | null;
  backgroundRepeat?: boolean;
  backgroundSmooth?: boolean;
  backgroundParallax?: boolean;
  color?: string;
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
