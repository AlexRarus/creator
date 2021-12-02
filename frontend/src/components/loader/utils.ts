import { ITheme } from 'src/components/theme';

export interface ILoaderProps {
  size: number;
  color?: string;
  theme?: ITheme;
}

export const getLoaderColor = ({ color, theme }: ILoaderProps) =>
  color || theme?.component?.loader?.color?.primary;
