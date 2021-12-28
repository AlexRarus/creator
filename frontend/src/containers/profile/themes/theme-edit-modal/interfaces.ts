import { IImage } from 'src/dal/images/interfaces';
export type { IThemeWrite as DataForServer } from 'src/dal/themes/interfaces';
import { IOption } from 'src/components/select';

// поля формы
export type FormInputs = {
  backgroundType: IOption;
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImage?: IImage | null;
  backgroundRepeat?: boolean;
  backgroundSmooth?: boolean;
  color?: string;
  headerColor?: string;
};

// входные значение с формы создание
export interface RawData {
  id?: number;
  formInputs: FormInputs;
  themeType?: string;
}
