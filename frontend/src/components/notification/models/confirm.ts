import {
  IConfirmNotificationOptions,
  IConfirmNotificationItem,
  IButtonData,
  IButton,
} from '../interfaces';

import CommonModel from './common';
import ButtonModel from './button';

// добавляет к общей модели поля type и buttons
export default class ConfirmModel extends CommonModel implements IConfirmNotificationItem {
  type: 'confirm' = 'confirm';
  buttons: IButton[];

  constructor(data: IConfirmNotificationOptions) {
    super(data);
    this.buttons = data.buttons.map((buttonData: IButtonData) => new ButtonModel(buttonData));
    this.immortal = data.immortal === undefined || data.immortal;
    this.hasCloseButton = Boolean(data.hasCloseButton);
  }
}
