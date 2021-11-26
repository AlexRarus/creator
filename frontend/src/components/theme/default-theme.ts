import { ITheme } from './interfaces';
import * as COLORS from './colors';

export const LIGHT_THEME: ITheme = {
  isMobile: false,
  isTablet: false,
  color: {
    primary: COLORS.blue[500],
    secondary: COLORS.red[500],
    success: COLORS.green[500],
    warning: COLORS.deepOrange[500],
    error: COLORS.red[500],
  },
  background: {
    primary: COLORS.grey[200],
    secondary: COLORS.blueGrey[500],
  },
  textColor: {
    primary: COLORS.grey[900],
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
        air: COLORS.white,
      },
      background: {
        primary: COLORS.blue[500],
        secondary: COLORS.grey[500],
        disabled: COLORS.grey[400],
        air: COLORS.indigo[900],
      },
      hover: {
        primary: COLORS.blue[600],
        secondary: COLORS.grey[600],
        disabled: COLORS.grey[400],
        air: COLORS.indigo[800],
      },
      active: {
        primary: COLORS.blue[500],
        secondary: COLORS.grey[500],
        disabled: COLORS.grey[400],
        air: COLORS.indigo[900],
      },
      borderColor: {
        primary: COLORS.blue[500],
        secondary: COLORS.grey[500],
        disabled: COLORS.grey[400],
        air: COLORS.indigo[900],
      },
    },
    input: {
      color: {
        primary: COLORS.black,
        secondary: COLORS.white,
        disabled: COLORS.grey[700],
        air: COLORS.grey[900],
      },
      background: {
        primary: 'inherit',
        secondary: COLORS.grey[500],
        disabled: COLORS.grey[400],
        air: COLORS.white,
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

export const DARK_THEME: ITheme = {
  isMobile: false,
  isTablet: false,
  color: {
    primary: COLORS.blue[300],
    secondary: COLORS.red[300],
    success: COLORS.green[300],
    warning: COLORS.deepOrange[400],
    error: COLORS.red[400],
  },
  background: {
    primary: COLORS.grey.A700,
    secondary: COLORS.blueGrey[500],
  },
  textColor: {
    primary: COLORS.grey[300],
    secondary: COLORS.grey[400],
  },
  borderColor: {
    primary: COLORS.grey.A700,
    secondary: COLORS.blueGrey[500],
  },
  component: {
    button: {
      color: {
        primary: COLORS.grey[300],
        secondary: COLORS.grey[300],
        disabled: COLORS.grey[500],
        air: COLORS.grey[300],
      },
      background: {
        primary: COLORS.blue[400],
        secondary: COLORS.grey.A400,
        disabled: COLORS.grey[400],
        air: COLORS.indigo.A200,
      },
      hover: {
        primary: COLORS.blue[300],
        secondary: COLORS.black,
        disabled: COLORS.grey[400],
        air: COLORS.indigo.A100,
      },
      active: {
        primary: COLORS.blue[300],
        secondary: COLORS.black,
        disabled: COLORS.grey[400],
        air: COLORS.indigo.A100,
      },
      borderColor: {
        primary: COLORS.blue[400],
        secondary: COLORS.grey.A400,
        disabled: COLORS.grey[400],
        air: COLORS.indigo.A200,
      },
    },
    input: {
      color: {
        primary: COLORS.grey[300],
        secondary: COLORS.grey[300],
        disabled: COLORS.grey[500],
        air: COLORS.grey[300],
      },
      background: {
        primary: 'inherit',
        secondary: COLORS.grey.A400,
        disabled: COLORS.grey[400],
        air: COLORS.white,
      },
      borderColor: {
        primary: COLORS.black,
        secondary: COLORS.grey[500],
        disabled: COLORS.grey[700],
      },
    },
    buttonLink: {
      color: {
        primary: COLORS.indigo.A200,
        secondary: COLORS.indigo.A400,
      },
    },
    link: {
      color: {
        primary: COLORS.indigo.A200,
        secondary: COLORS.red[200],
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
