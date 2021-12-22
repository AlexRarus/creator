import { AdditionalData } from '../../interfaces';

// поля формы
export interface FormInputs {
  isWide: boolean;
  isTransparent: boolean;
  value: string;
  kind: string;
  icon?: IButtonIcon;
}

export interface IButtonIcon {
  id: number;
  src: string;
}

// входные значение с формы создание
export interface RawData extends AdditionalData {
  formInputs: FormInputs;
}

export interface DataToServer {
  isWide: boolean;
  isTransparent: boolean;
  value: string;
  kind: string;
  icon?: number; // при прикреплении изображения нужно отправить его id
}
