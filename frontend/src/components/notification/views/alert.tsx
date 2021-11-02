import React from 'react';

import { IAlertNotificationItem, INotificationInnerProps } from '../interfaces';

import Button from './button';
import { ContentWrapper, Message, ButtonsWrapper } from './style';

export default function AlertNotification(props: IAlertNotificationItem & INotificationInnerProps) {
  const { message, button, onClose } = props;

  return (
    <ContentWrapper>
      <Message>
        {Array.isArray(message)
          ? message.map((m: string, i: number) => <div key={i}>{m}</div>)
          : message}
      </Message>
      <ButtonsWrapper>
        <Button {...button} onCloseNotification={onClose} />
      </ButtonsWrapper>
    </ContentWrapper>
  );
}
