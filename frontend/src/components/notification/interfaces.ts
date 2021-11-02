export interface IButtonData {
  label: string;
  onClick: (buttonId: string) => void;
  buttonId?: string;
  closeOnButton?: boolean;
  buttonType?: TButtonType;
}

export interface IButton extends IButtonData {
  buttonId: string;
  closeOnButton: boolean;
  buttonType: TButtonType;
}

export type TTimerId = ReturnType<typeof setTimeout> | number;
export type TNotificationType = 'message' | 'alert' | 'confirm';
export type TButtonType = 'primary' | 'secondary' | 'link';
export type TNotificationLevel = 'success' | 'warning' | 'error' | 'info';

export interface ICommonNotificationOptions {
  message: string | string[]; // текст нотификации
  level?: TNotificationLevel; // влияет на цвет нотификации
  lifeTime?: number; // время жизни (по умолчанию 8 секунд)
  immortal?: boolean; // если true, то нотификация будет "видна" пока пользователь ее не закроет
  hasCloseButton?: boolean; // показывать или нет кнопку закрытия нотификации
  type?: TNotificationType;
  id?: string; // все id должны быть уникальными
}

export interface ICommonNotificationItem {
  id: string;
  message: string | string[];
  level: TNotificationLevel;
  lifeTime: number;
  immortal: boolean;
  hasCloseButton: boolean;
}

// init data interfaces
export interface IMessageNotificationOptions extends ICommonNotificationOptions {
  type?: 'message';
}
export interface IAlertNotificationOptions extends ICommonNotificationOptions {
  type: 'alert';
  button: IButtonData;
}
export interface IConfirmNotificationOptions extends ICommonNotificationOptions {
  type: 'confirm';
  buttons: {
    0: IButtonData;
  } & IButtonData[]; // минимум 1 элемент в массиве
}

// items interfaces
export interface IMessageNotificationItem extends ICommonNotificationItem {
  type?: 'message';
}
export interface IAlertNotificationItem extends ICommonNotificationItem {
  type: 'alert';
  button: IButton;
}
export interface IConfirmNotificationItem extends ICommonNotificationItem {
  type: 'confirm';
  buttons: IButton[];
}

export type INotificationItem =
  | IMessageNotificationItem
  | IAlertNotificationItem
  | IConfirmNotificationItem;
export type INotificationOptions =
  | IMessageNotificationOptions
  | IAlertNotificationOptions
  | IConfirmNotificationOptions;

export interface INotificationInnerProps {
  locale: TLocale;
  onClose(): void;
}

export type TLocale = 'ru' | 'en';
export type TCloseItemCallback = (id: string, isCloseByUser: boolean) => void;
