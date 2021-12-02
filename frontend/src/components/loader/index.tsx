import React from 'react';

import { LoaderWrapper } from './style';
import { RingLoader } from './ring-loader';
import { RippleLoader } from './ripple-loader';

interface IProps {
  type?: 'ring' | 'ripple';
  size?: number;
  color?: string;
}

export const Loader = (props: IProps) => {
  const { type = 'default', size = 20, ...restProps } = props;

  switch (type) {
    case 'ring':
      return (
        <LoaderWrapper size={size}>
          <RingLoader size={size} {...restProps} />
        </LoaderWrapper>
      );
    case 'ripple':
      return (
        <LoaderWrapper size={size}>
          <RippleLoader size={size} {...restProps} />
        </LoaderWrapper>
      );
    default:
      return (
        <LoaderWrapper size={size}>
          <RingLoader size={size} {...restProps} />
        </LoaderWrapper>
      );
  }
};
