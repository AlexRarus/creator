import React from 'react';

import { IMessageNotificationItem, INotificationInnerProps } from '../interfaces';

import { ContentWrapper, Message } from './style';

export default function MessageNotification(
  props: IMessageNotificationItem & INotificationInnerProps
) {
  return (
    <ContentWrapper>
      <Message>
        {Array.isArray(props.message)
          ? props.message.map((m: string, i: number) => <div key={i}>{m}</div>)
          : props.message}
      </Message>
    </ContentWrapper>
  );
}
