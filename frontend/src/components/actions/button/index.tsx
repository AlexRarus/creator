import React from 'react';

import { IButtonStyledProps, ButtonStyled } from './style';

interface IProps extends IButtonStyledProps {
  children: any;
  onClick?(): void;
}
export type { IButtonStyledProps as IButton };

export const Button = React.forwardRef((props: IProps, ref: any) => {
  const { children, onClick, disabled = false, ...restProps } = props;

  const clickHandler = () => {
    if (!disabled) {
      onClick && onClick();
    }
  };

  return (
    <ButtonStyled onClick={clickHandler} disabled={disabled} {...restProps} ref={ref}>
      {children}
    </ButtonStyled>
  );
});

Button.displayName = 'Button';
