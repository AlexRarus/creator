import React from 'react';

import { IconButtonWrapper } from './style';

interface IProps {
  children: any;
  onClick(): any;
  onMouseLeave?: any;
  onMouseEnter?: any;
  isOpen?: boolean;
  isActive?: boolean;
  disabled?: boolean;
}

export const IconButton = React.forwardRef((props: IProps, ref: any) => {
  const {
    children,
    onClick,
    onMouseLeave,
    onMouseEnter,
    isActive = false,
    disabled = false,
    isOpen,
  } = props;

  const clickHandler = () => {
    if (!disabled) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    onMouseEnter && onMouseEnter();
  };

  const handleMouseLeave = () => {
    onMouseLeave && onMouseLeave();
  };

  return (
    <IconButtonWrapper
      ref={ref}
      onClick={clickHandler}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      isActive={isActive}
      isOpen={isOpen}
      disabled={disabled}>
      {children}
    </IconButtonWrapper>
  );
});

IconButton.displayName = 'IconButton';
