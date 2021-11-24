export type TMediaSize = 'max320' | 'max530' | 'max950' | 'max1024' | 'max1280' | 'min1280';
export type TGridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type IMedia = {
  [key in TMediaSize]: string;
};

export type IGridBreakPoints = {
  [key: string]: TGridSize; // 10: 1024 (10 колонок при разрешении 1024px)
};

interface IThemePalette {
  primary: string;
  secondary: string;
  disabled?: string;
  success?: string;
  warning?: string;
  error?: string;
  link?: string;
  air?: string;
}
interface IThemeBase {
  color: IThemePalette;
  background?: IThemePalette;
  textColor?: IThemePalette;
  borderColor?: IThemePalette;
}

export interface ITheme extends IThemeBase {
  isMobile?: boolean;
  isTablet?: boolean;
  component: {
    button: IThemeBase;
    input: IThemeBase;
    link: IThemeBase;
    buttonLink: IThemeBase;
  };
  gridBreakPoints: IGridBreakPoints;
}

export type IColorWithAlter = IColor & IAlternativeColor;

export interface IColor {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface IAlternativeColor {
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}
