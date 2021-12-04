import React from 'react';

import { IconButtonWrapper } from './style';

interface IProps {
  children: any;
  onClick(): any;
  isOpen?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  refCallback?: any;
}

export const IconButton = (props: IProps) => {
  const { children, onClick, isActive = false, disabled = false, refCallback, isOpen } = props;

  const clickHandler = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <IconButtonWrapper
      ref={refCallback}
      onClick={clickHandler}
      isActive={isActive}
      isOpen={isOpen}
      disabled={disabled}>
      {children}
    </IconButtonWrapper>
  );
};
