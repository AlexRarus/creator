import { INotificationOptions, INotificationItem, TCloseItemCallback } from './interfaces';
import createNotification from './models';

type TSubscriberChange = (list: INotificationItem[]) => void;
type TSubscriberRemove = (...ids: string[]) => void;

class StoreNotifications {
  list: INotificationItem[] = [];
  changeSubscribes: TSubscriberChange[] = [];
  removeSubscribes: TSubscriberRemove[] = [];

  addNotificationItem = (...items: INotificationOptions[]) => {
    const filteredItems: INotificationOptions[] = this.filterDuplicate(items);

    if (filteredItems.length) {
      // validate ids
      this.list.push(...filteredItems.map(createNotification));
      this.onChange();
    }
  };

  // запуск анимации удаления
  removeNotificationItem = (...ids: string[]) => {
    const availableIds = ids.filter((id: string) =>
      this.list.some((item: INotificationItem) => item.id === id)
    );

    if (availableIds.length) {
      this.removeSubscribes.forEach((subscriber: TSubscriberRemove) => subscriber(...availableIds));
    }
  };

  removeAll = () => {
    const availableIds = this.list.map((item: INotificationItem) => item.id);

    if (availableIds.length) {
      this.removeSubscribes.forEach((subscriber: TSubscriberRemove) => subscriber(...availableIds));
    }
  };

  // немедленное удаление из списка элементов
  deleteItem = (id: string, onCloseItemCallback?: TCloseItemCallback, isClosedByUser?: boolean) => {
    const hasItem: boolean = this.list.some((item: INotificationItem) => item.id === id);

    if (hasItem) {
      this.list = this.list.filter((item: INotificationItem) => item.id !== id);

      this.onChange();

      if (onCloseItemCallback) {
        onCloseItemCallback(id, Boolean(isClosedByUser));
      }
    }
  };

  onChange = () => {
    this.changeSubscribes.forEach((subscriber: TSubscriberChange) => subscriber(this.list));
  };

  // добавление или удаление элементов
  subscribeOnChange = (callback: TSubscriberChange) => {
    this.changeSubscribes.push(callback);
  };

  // запуск удаления элемента с анимацией
  subscribeOnRemove = (callback: TSubscriberRemove) => {
    this.removeSubscribes.push(callback);
  };

  unsubscribeOnChange = (callback: TSubscriberChange) => {
    this.changeSubscribes = this.changeSubscribes.filter(
      (subscriber: TSubscriberChange) => subscriber !== callback
    );
  };

  unsubscribeOnRemove = (callback: TSubscriberRemove) => {
    this.removeSubscribes = this.removeSubscribes.filter(
      (subscriber: TSubscriberRemove) => subscriber !== callback
    );
  };

  filterDuplicate = (items: INotificationOptions[]) => {
    return items.filter((newItem: INotificationOptions) => {
      return this.list.every((item: INotificationItem) => item.id !== newItem.id);
    });
  };
}

export default new StoreNotifications();
