import { IMessageNotificationOptions, IMessageNotificationItem } from '../interfaces';

import CommonModel from './common';

// добавляет к общей модели поле type
export default class MessageModel extends CommonModel implements IMessageNotificationItem {
  type: 'message' = 'message';

  constructor(data: IMessageNotificationOptions) {
    super(data);
  }
}
