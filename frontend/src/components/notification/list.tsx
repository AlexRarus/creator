import React, { useState, useEffect } from 'react';

import store from './store';
import { INotificationItem, TLocale, TCloseItemCallback } from './interfaces';
import { NotificationListWrapper } from './style';
import NotificationItem from './item';

interface IProps {
  isMobile: boolean;
  width: number;
  maxShowItems: number;
  locale: TLocale;
  onCloseItem?: TCloseItemCallback;
}

export default function NotificationList(props: IProps) {
  const { maxShowItems, onCloseItem, locale } = props;
  const [items, setItems] = useState<INotificationItem[]>(store.list);
  const visibleItems: INotificationItem[] = items.slice(0, maxShowItems);

  // удаление СНАРУЖИ (подпись на внешнее событие удаления)
  const onRemove = (...ids: string[]) => {
    ids.forEach((id: string) => {
      // если нотификация в данный момент НЕ отрисованна
      if (visibleItems.every((item: INotificationItem) => item.id !== id)) {
        store.deleteItem(id); // не передаем колбэк на удаление потому-что оно инициированно снаружи
      }
    });
  };

  useEffect(() => {
    const onChange = (items: INotificationItem[]) => {
      setItems([...items]);
    };

    store.subscribeOnChange(onChange);
    store.subscribeOnRemove(onRemove);

    return () => {
      store.unsubscribeOnChange(onChange);
      store.unsubscribeOnRemove(onRemove);
    };
  });

  return (
    <NotificationListWrapper>
      {visibleItems.map((item: INotificationItem) => (
        <NotificationItem key={item.id} item={item} onCloseItem={onCloseItem} locale={locale} />
      ))}
    </NotificationListWrapper>
  );
}
