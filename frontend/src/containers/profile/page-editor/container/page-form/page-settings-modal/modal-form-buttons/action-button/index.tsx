import React from 'react';

import { IActionButtonProps, ActionButtonStyled } from './style';

export interface IProps extends Partial<IActionButtonProps> {
  id: string;
  children: any;
  onClick?(id: string): void;
}

export interface IAction extends Partial<IActionButtonProps> {
  id: string;
  label: string;
}

export const ActionButton = React.forwardRef((props: IProps, ref: any) => {
  const { children, id, onClick, disabled = false, ...restProps } = props;

  const clickHandler = () => {
    if (!disabled) {
      onClick && onClick(id);
    }
  };

  return (
    <ActionButtonStyled onClick={clickHandler} disabled={disabled} {...restProps} ref={ref}>
      {children}
    </ActionButtonStyled>
  );
});

ActionButton.displayName = 'ActionButton';
