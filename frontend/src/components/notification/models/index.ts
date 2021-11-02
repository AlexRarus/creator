import {
  INotificationOptions,
  INotificationItem,
  IMessageNotificationOptions,
  IAlertNotificationOptions,
  IConfirmNotificationOptions,
} from '../interfaces';

import MessageModel from './message';
import AlertModel from './alert';
import ConfirmModel from './confirm';

export default function createNotification(data: INotificationOptions): INotificationItem {
  switch (data.type) {
    case 'message':
      const messageData: IMessageNotificationOptions = data as IMessageNotificationOptions;
      return new MessageModel(messageData);
    case 'alert':
      const alertData: IAlertNotificationOptions = data as IAlertNotificationOptions;
      return new AlertModel(alertData);
    case 'confirm':
      const confirmData: IConfirmNotificationOptions = data as IConfirmNotificationOptions;
      return new ConfirmModel(confirmData);
    default:
      const defaultData: IMessageNotificationOptions = data as IMessageNotificationOptions;
      return new MessageModel(defaultData);
  }
}
