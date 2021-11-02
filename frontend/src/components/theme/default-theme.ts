import { ITheme } from './interfaces';
import * as COLORS from './colors';

export const defaultTheme: ITheme = {
  color: {
    primary: COLORS.blue[500],
    secondary: COLORS.red[500],
    success: COLORS.green[500],
    warning: COLORS.deepOrange[500],
    error: COLORS.red[500],
  },
  background: {
    primary: COLORS.white,
    secondary: COLORS.blueGrey[500],
  },
  textColor: {
    primary: COLORS.black,
    secondary: COLORS.grey[500],
  },
  borderColor: {
    primary: COLORS.white,
    secondary: COLORS.blueGrey[500],
  },
  component: {
    button: {
      color: {
        primary: COLORS.white,
        secondary: COLORS.white,
        disabled: COLORS.grey[700],
      },
      background: {
        primary: COLORS.blue[500],
        secondary: COLORS.grey[500],
        disabled: COLORS.grey[400],
      },
      borderColor: {
        primary: COLORS.blue[500],
        secondary: COLORS.grey[500],
        disabled: COLORS.grey[400],
      },
    },
    input: {
      color: {
        primary: COLORS.black,
        secondary: COLORS.white,
        disabled: COLORS.grey[700],
      },
      background: {
        primary: 'inherit',
        secondary: COLORS.grey[500],
        disabled: COLORS.grey[400],
      },
      borderColor: {
        primary: COLORS.black,
        secondary: COLORS.grey[500],
        disabled: COLORS.grey[700],
      },
    },
    buttonLink: {
      color: {
        primary: COLORS.indigo[800],
        secondary: COLORS.indigo[800],
      },
    },
    link: {
      color: {
        primary: COLORS.indigo[700],
        secondary: COLORS.red[500],
      },
    },
  },
  gridBreakPoints: {
    '320px': 4,
    '530px': 6,
    '950px': 8,
    '1024px': 10,
    '1280px': 12,
  },
};

export const getThemeProps = (pathToProp: string) => ({ theme }: any) => {
  const path = pathToProp.split('.');
  return path.reduce((result: any, key: any) => {
    if (result?.[key]) {
      return result[key];
    } else if (result) {
      console.warn(`Has no props "${key}" path "${pathToProp}" in theme`);
    }
    return '';
  }, theme);
};
