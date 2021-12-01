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
    secondary: COLORS.blueGrey[200],
  },
  textColor: {
    primary: COLORS.grey[900],
    secondary: COLORS.grey[500],
  },
  borderColor: {
    primary: COLORS.white,
    secondary: COLORS.blueGrey[500],
    contrast: COLORS.grey[900],
  },
  component: {
    button: {
      color: {
        primary: COLORS.white,
        secondary: COLORS.grey[900],
        disabled: COLORS.grey[300],
        air: COLORS.white,
        formed: COLORS.grey[200],
        success: COLORS.grey[200],
      },
      background: {
        primary: COLORS.blue[500],
        secondary: COLORS.white,
        disabled: COLORS.grey[400],
        air: COLORS.indigo[900],
        formed: COLORS.blue[400],
        success: COLORS.green[500],
      },
      hover: {
        primary: COLORS.blue[600],
        secondary: COLORS.white,
        disabled: COLORS.grey[400],
        air: COLORS.indigo[800],
        formed: COLORS.blue[600],
        success: COLORS.green[400],
      },
      active: {
        primary: COLORS.blue[500],
        secondary: COLORS.grey[500],
        disabled: COLORS.grey[400],
        air: COLORS.indigo[900],
        formed: COLORS.blue[500],
        success: COLORS.green[500],
      },
      borderColor: {
        primary: COLORS.blue[500],
        secondary: COLORS.grey[500],
        disabled: COLORS.grey[400],
        air: COLORS.indigo[900],
        formed: COLORS.blue[400],
        success: COLORS.green[500],
      },
    },
    input: {
      color: {
        primary: COLORS.black,
        secondary: COLORS.white,
        disabled: COLORS.grey[700],
        air: COLORS.grey[900],
        formed: COLORS.grey[900],
      },
      background: {
        primary: 'inherit',
        secondary: COLORS.grey[500],
        disabled: COLORS.grey[400],
        air: COLORS.white,
        formed: COLORS.white,
        hover: COLORS.grey[200],
      },
      borderColor: {
        primary: COLORS.black,
        secondary: COLORS.grey[500],
        disabled: COLORS.grey[700],
        formed: COLORS.grey[200],
        hover: COLORS.yellow[700],
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
    notification: {
      color: {
        success: COLORS.green[800],
        warning: COLORS.orange[800],
        error: COLORS.red[800],
        info: COLORS.blue[800],
      },
      background: {
        success: COLORS.green[200],
        warning: COLORS.orange[200],
        error: COLORS.pink[200],
        info: COLORS.blue[200],
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
    secondary: COLORS.grey.A400,
  },
  textColor: {
    primary: COLORS.grey[300],
    secondary: COLORS.grey[400],
  },
  borderColor: {
    primary: COLORS.grey.A700,
    secondary: COLORS.blueGrey[500],
    contrast: COLORS.grey[200],
  },
  component: {
    button: {
      color: {
        primary: COLORS.grey[300],
        secondary: COLORS.grey[300],
        disabled: COLORS.grey[500],
        air: COLORS.grey[300],
        formed: COLORS.grey[200],
        success: COLORS.grey[200],
      },
      background: {
        primary: COLORS.blue[400],
        secondary: COLORS.grey.A400,
        disabled: COLORS.grey[400],
        air: COLORS.indigo.A200,
        formed: COLORS.blue[400],
        success: COLORS.green[500],
      },
      hover: {
        primary: COLORS.blue[300],
        secondary: COLORS.grey.A400,
        disabled: COLORS.grey[400],
        air: COLORS.indigo.A100,
        formed: COLORS.blue[600],
        success: COLORS.green[400],
      },
      active: {
        primary: COLORS.blue[300],
        secondary: COLORS.black,
        disabled: COLORS.grey[400],
        air: COLORS.indigo.A100,
        formed: COLORS.blue[500],
        success: COLORS.green[500],
      },
      borderColor: {
        primary: COLORS.blue[400],
        secondary: COLORS.grey.A100,
        disabled: COLORS.grey[400],
        air: COLORS.indigo.A200,
        formed: COLORS.blue[400],
        success: COLORS.green[500],
      },
    },
    input: {
      color: {
        primary: COLORS.grey[300],
        secondary: COLORS.grey[300],
        disabled: COLORS.grey[500],
        air: COLORS.grey[300],
        formed: COLORS.grey[300],
      },
      background: {
        primary: 'inherit',
        secondary: COLORS.grey.A400,
        disabled: COLORS.grey[400],
        air: COLORS.grey.A400,
        formed: COLORS.grey.A400,
      },
      borderColor: {
        primary: COLORS.black,
        secondary: COLORS.grey[500],
        disabled: COLORS.grey.A400,
        formed: COLORS.grey.A100,
        hover: COLORS.grey.A200,
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
    notification: {
      color: {
        success: COLORS.green[50],
        warning: COLORS.orange[50],
        error: COLORS.red[50],
        info: COLORS.blue[50],
      },
      background: {
        success: COLORS.green[500],
        warning: COLORS.orange[500],
        error: COLORS.red[500],
        info: COLORS.blue[500],
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
