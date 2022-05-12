import React from 'react';

import { IphoneX, Speaker, Camera, ContentBlock } from './style';

export const DeviceContainer = (props: any) => {
  const { children } = props;
  return (
    <IphoneX>
      <Speaker>Speaker</Speaker>
      <Camera>Camera</Camera>
      <ContentBlock>{children}</ContentBlock>
    </IphoneX>
  );
};
