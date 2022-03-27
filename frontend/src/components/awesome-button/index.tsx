import React from 'react';

import { Button } from './style';

interface IProps {
  onClick?: any;
  children?: any;
}

export const AwesomeButton = ({ onClick, children }: IProps) => {
  return <Button onClick={onClick}>{children}</Button>;
};
