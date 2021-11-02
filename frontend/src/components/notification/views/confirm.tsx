import React from 'react';

import { IConfirmNotificationItem, INotificationInnerProps, IButton } from '../interfaces';

import Button from './button';
import { ContentWrapper, Message, ButtonsWrapper } from './style';

export default function ConfirmNotification(
  props: IConfirmNotificationItem & INotificationInnerProps
) {
  const { message, buttons, onClose } = props;

  return (
    <ContentWrapper>
      <Message>
        {Array.isArray(message)
          ? message.map((m: string, i: number) => <div key={i}>{m}</div>)
          : message}
      </Message>
      <ButtonsWrapper>
        {buttons.map((buttonData: IButton) => (
          <Button key={buttonData.buttonId} {...buttonData} onCloseNotification={onClose} />
        ))}
      </ButtonsWrapper>
    </ContentWrapper>
  );
}
