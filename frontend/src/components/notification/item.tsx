import React, { useRef, useEffect, useState, RefObject } from 'react';

import { INotificationItem, TTimerId, TLocale, TCloseItemCallback } from './interfaces';
import store from './store';
import { NotificationItemWrapper } from './style';
import NotificationHeader from './item-header';
import NotificationContent from './views';

interface IProps {
  item: INotificationItem;
  locale: TLocale;
  onCloseItem?: TCloseItemCallback;
}

const OPEN_ANIMATION_TIME = 300;
const CLOSE_ANIMATION_TIME = 600;

export default function NotificationItem(props: IProps) {
  const { item, onCloseItem, locale } = props;
  const timerId = useRef<TTimerId>();
  const closeTimerId = useRef<TTimerId>();
  const itemRef: RefObject<HTMLDivElement> = useRef(null);
  const [animation, setAnimation] = useState<'open' | 'close'>('open');
  const [height, setHeight] = useState(0);
  const [isClosedByUser, setClosedByUser] = useState(false);

  const removeNotificationStart = (isByUser: boolean) => {
    if (animation !== 'close') {
      const itemElement: HTMLDivElement | null = itemRef && itemRef.current;
      const height: number = itemElement ? itemElement.getBoundingClientRect().height : 0;

      setClosedByUser(isByUser);
      setHeight(height);
      setAnimation('close');
    }
  };

  const removeNotificationEnd = () => {
    store.deleteItem(item.id, onCloseItem, isClosedByUser);
  };

  const closeByUser = () => removeNotificationStart(true);
  const closeByTimer = () => removeNotificationStart(false);

  // таймер жизни уведомления
  useEffect(() => {
    if (!timerId.current && !item.immortal) {
      timerId.current = setTimeout(closeByTimer, item.lifeTime);
    }
  });

  useEffect(() => {
    if (animation === 'close' && !closeTimerId.current) {
      closeTimerId.current = setTimeout(removeNotificationEnd, CLOSE_ANIMATION_TIME);
    }
  });

  // удаление СНАРУЖИ (подпись на внешнее событие удаления)
  useEffect(() => {
    const onRemove = (...ids: string[]) => {
      ids.forEach((id: string) => {
        if (id === item.id) {
          closeByTimer();
        }
      });
    };

    store.subscribeOnRemove(onRemove);
    return () => store.unsubscribeOnRemove(onRemove);
  }, []);

  // unmount
  useEffect(
    () => () => {
      clearInterval(timerId.current as ReturnType<typeof setTimeout>);
      clearInterval(closeTimerId.current as ReturnType<typeof setTimeout>);
    },
    []
  );

  const innerProps = {
    ...item,
    locale,
    onClose: closeByUser,
  };

  return (
    <NotificationItemWrapper
      level={item.level}
      immortal={item.immortal}
      animation={animation}
      openAnimationTime={OPEN_ANIMATION_TIME}
      closeAnimationTime={CLOSE_ANIMATION_TIME}
      height={height}
      ref={itemRef}>
      <NotificationHeader {...innerProps} />
      <NotificationContent {...innerProps} />
    </NotificationItemWrapper>
  );
}
