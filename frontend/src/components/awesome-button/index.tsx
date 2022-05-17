import React from 'react';

import { Button } from './style';

interface IProps {
  onClick?: any;
  children?: any;
  className?: any;
}

export const AwesomeButton = ({ onClick, children, className }: IProps) => {
  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
};
