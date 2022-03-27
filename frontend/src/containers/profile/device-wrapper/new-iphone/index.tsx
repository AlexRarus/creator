import React from 'react';

import { IphoneX, ContentBlock } from './style';

export const DeviceContainer = (props: any) => {
  const { children } = props;
  return (
    <IphoneX>
      <i>Speaker</i>
      <b>Camera</b>
      <ContentBlock>{children}</ContentBlock>
    </IphoneX>
  );
};
