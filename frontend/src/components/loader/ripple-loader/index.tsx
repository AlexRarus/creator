import React from 'react';

import { ILoaderProps } from '../utils';

import { RippleLoaderWrapper } from './style';

export const RippleLoader = (props: ILoaderProps) => {
  return (
    <RippleLoaderWrapper {...props}>
      <div />
      <div />
    </RippleLoaderWrapper>
  );
};
