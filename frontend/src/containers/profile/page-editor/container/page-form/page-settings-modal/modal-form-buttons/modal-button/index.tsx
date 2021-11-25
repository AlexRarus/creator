import React from 'react';

import { IModalButtonProps, ModalButtonStyled } from './style';

interface IProps extends IModalButtonProps {
  children: any;
  onClick?(): void;
}

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
