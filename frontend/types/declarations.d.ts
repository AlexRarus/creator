declare let __DEV__: boolean;
declare let NODE_ENV: any;
declare let REACT_APP_ENV: any;
declare let REACT_APP_COMMITDATE: any;
declare let REACT_APP_COMMITHASH: any;
declare let REACT_APP_BRANCH: any;
declare let API_URL: any;
declare let SSR_INITIAL_STATE: any;

declare module '*.json';
declare module '*.ttf';
declare module '*.otf';

interface IAnyValues {
  [propName: string]: any;
}
