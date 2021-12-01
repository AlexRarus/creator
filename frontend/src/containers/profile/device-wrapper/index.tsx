import React from 'react';

import { IphoneX, ContentBlock } from './style';

export const DeviceContainer = (props: any) => {
  const { children } = props;
  return (
    <IphoneX>
      <div className='notch'>
        <div className='camera' />
        <div className='speaker' />
      </div>
      <div className='top-bar' />
      <div className='sleep' />
      <div className='bottom-bar' />
      <div className='volume' />
      <div className='overflow'>
        <div className='shadow shadow--tr' />
        <div className='shadow shadow--tl' />
        <div className='shadow shadow--br' />
        <div className='shadow shadow--bl' />
      </div>
      <div className='inner-shadow' />
      <div className='screen'>
        <ContentBlock>{children}</ContentBlock>
      </div>
    </IphoneX>
  );
};
