import React from 'react';

import { IModalButtonStyledProps, ModalButtonStyled } from './style';

interface IProps extends IModalButtonStyledProps {
  children: any;
  onClick?(): void;
}
export type { IModalButtonStyledProps as IButton };

export const ModalButton = React.forwardRef((props: IProps, ref: any) => {
  const { children, onClick, disabled = false, ...restProps } = props;

  const clickHandler = () => {
    if (!disabled) {
      onClick && onClick();
    }
  };

  return (
    <ModalButtonStyled onClick={clickHandler} disabled={disabled} {...restProps} ref={ref}>
      {children}
    </ModalButtonStyled>
  );
});

ModalButton.displayName = 'ModalButton';
