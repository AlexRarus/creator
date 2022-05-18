import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { isBrowser } from 'src/utils/detectEnvironment';

import { GlobalStyle } from './style';
import NotificationList from './list';
import store from './store';
import { TLocale, TCloseItemCallback } from './interfaces';
export const addNotificationItem = store.addNotificationItem;
export const removeNotificationItem = store.removeNotificationItem;
export const removeAll = store.removeAll;
export * from './interfaces';

interface IProps {
  parentNodeId?: string;
  isMobile?: boolean;
  width?: number;
  maxShowItems?: number; // максимальное колличество одновременно отрисованных уведомлений
  onCloseItem?: TCloseItemCallback; // будет вызван при удалении видимого (отрисованного) элемента нотификации
  locale?: TLocale;
}

export default class Notification extends Component<IProps> {
  static defaultProps: Partial<IProps> = {
    parentNodeId: 'notification',
    isMobile: false,
  };

  notification: HTMLElement;

  constructor(props: IProps) {
    super(props);
    // todo ssr костыль
    if (isBrowser) {
      this.notification = document.createElement('div');
      this.notification.setAttribute('id', props.parentNodeId || '');
      document.body.appendChild(this.notification);
    }
  }

  render() {
    const {
      parentNodeId,
      isMobile = false,
      width = 320,
      maxShowItems = 10,
      onCloseItem,
      locale = 'ru',
    } = this.props;

    // todo ssr костыль
    return isBrowser
      ? createPortal(
          <>
            <GlobalStyle parentNodeId={parentNodeId} isMobile={isMobile} width={width} />
            <NotificationList
              isMobile={isMobile}
              width={width}
              maxShowItems={maxShowItems}
              onCloseItem={onCloseItem}
              locale={locale}
            />
          </>,
          this.notification
        )
      : null;
  }
}
