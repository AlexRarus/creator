import { IAlertNotificationOptions, IAlertNotificationItem, IButton } from '../interfaces';

import CommonModel from './common';
import ButtonModel from './button';

// добавляет к общей модели поля type и button
export default class AlertModel extends CommonModel implements IAlertNotificationItem {
  type: 'alert' = 'alert';
  button: IButton;

  constructor(data: IAlertNotificationOptions) {
    super(data);
    this.button = new ButtonModel(data.button);
    this.immortal = data.immortal === undefined || data.immortal;
  }
}
