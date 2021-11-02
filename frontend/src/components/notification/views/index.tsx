import React from 'react';

import {
  INotificationItem,
  IMessageNotificationItem,
  IAlertNotificationItem,
  IConfirmNotificationItem,
  INotificationInnerProps,
} from '../interfaces';

import Message from './message';
import Alert from './alert';
import Confirm from './confirm';

// todo добавить типы нотификаций при необходимости
export default function NotificationView(props: INotificationItem & INotificationInnerProps) {
  const { type, onClose, locale } = props;

  const extraProps = {
    locale,
    onClose,
  };

  switch (type) {
    case 'message':
      const messageProps: IMessageNotificationItem = props as IMessageNotificationItem;
      return <Message {...messageProps} {...extraProps} />;
    case 'alert':
      const alertProps: IAlertNotificationItem = props as IAlertNotificationItem;
      return <Alert {...alertProps} {...extraProps} />;
    case 'confirm':
      const confirmProps: IConfirmNotificationItem = props as IConfirmNotificationItem;
      return <Confirm {...confirmProps} {...extraProps} />;
    default:
      const defaultProps: IMessageNotificationItem = props as IMessageNotificationItem;
      return <Message {...defaultProps} {...extraProps} />;
  }
}
