import React from 'react';

import { ILoaderProps } from '../utils';

import { RingLoaderWrapper } from './style';

export const RingLoader = (props: ILoaderProps) => {
  return (
    <RingLoaderWrapper {...props}>
      <div />
      <div />
      <div />
      <div />
    </RingLoaderWrapper>
  );
};
