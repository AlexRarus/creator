import React from 'react';

import { IconButtonWrapper } from './style';

interface IProps {
  children: any;
  onClick(): any;
  isActive?: boolean;
  disabled?: boolean;
}

export const IconButton = (props: IProps) => {
  const { children, onClick, isActive = false, disabled = false } = props;

  const clickHandler = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <IconButtonWrapper onClick={clickHandler} isActive={isActive} disabled={disabled}>
      {children}
    </IconButtonWrapper>
  );
};
