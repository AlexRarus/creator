import React from 'react';

import { IAction } from '../interfaces';

import { ActionButtonStyled } from './style';

export interface IProps {
  action: IAction;
  onClick?(id: string): void;
}

export const MobileActionButton = React.forwardRef((props: IProps, ref: any) => {
  const { onClick, action } = props;

  const clickHandler = () => {
    if (!action.disabled) {
      onClick && onClick(action.id);
    }
  };

  return (
    <ActionButtonStyled onClick={clickHandler} {...action} ref={ref}>
      {action.label}
    </ActionButtonStyled>
  );
});

MobileActionButton.displayName = 'MobileActionButton';
