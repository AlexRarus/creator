import { v4 as uuidv4 } from 'uuid';

import {
  ICommonNotificationOptions,
  ICommonNotificationItem,
  TNotificationType,
  TNotificationLevel,
} from '../interfaces';

// общая модель для всех нотификаций
export default class CommonModel implements ICommonNotificationItem {
  id: string;
  message: string | string[];
  level: TNotificationLevel;
  lifeTime: number;
  immortal: boolean;
  hasCloseButton: boolean;
  type: TNotificationType;

  constructor(data: ICommonNotificationOptions) {
    this.id = data.id || uuidv4();
    this.message = data.message;
    this.level = data.level || 'success';
    this.lifeTime = data.lifeTime || 8000;
    this.immortal = Boolean(data.immortal);
    this.hasCloseButton = data.hasCloseButton === undefined || data.hasCloseButton;
    this.type = data.type || 'message';
  }
}
