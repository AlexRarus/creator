import React, { useCallback } from 'react';

import { IButton } from '../interfaces';

import { Button } from './style';
import { IButtonViewProps } from './interfaces';

export default function ButtonComponent(props: IButton & IButtonViewProps) {
  const { buttonId, onClick, label, closeOnButton, onCloseNotification, buttonType } = props;

  const onClickHandler = useCallback(() => {
    onClick(buttonId);
    closeOnButton && onCloseNotification();
  }, [onClick, buttonId, closeOnButton, onCloseNotification]);

  return (
    <Button onClick={onClickHandler} buttonType={buttonType}>
      {label}
    </Button>
  );
}
