import { AdditionalData } from '../../interfaces';
import { IImage } from 'src/dal/images/interfaces';

// поля формы
export interface FormInputs {
  label: string;
  description: string;
  type: string;
  value: string;
  kind?: string;
  icon?: IImage | null;
  backgroundColor: string;
  color: string;
}

// входные значение с формы создание
export interface RawData extends AdditionalData {
  formInputs: FormInputs;
}
