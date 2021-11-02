import { ICommonProps } from '../interfaces';

export interface IProps extends ICommonProps {
  value: number;
  direction?: 1 | -1;
}
