import { IOption } from 'src/components/select';

export interface IColor {
  id: any;
  value: string;
}

export interface FormInputs {
  direction: IOption;
  colors: IColor[];
}
