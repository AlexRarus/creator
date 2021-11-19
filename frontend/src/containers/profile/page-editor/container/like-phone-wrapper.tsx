import React from 'react';

import { PhoneWrapper } from './style';

interface IProps {
  children: any;
}

export const LikePhoneWrapper = (props: IProps) => {
  const { children } = props;

  return <PhoneWrapper>{children}</PhoneWrapper>;
};
