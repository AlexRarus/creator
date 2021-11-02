import React, { useCallback } from 'react';

import { IRowAction, TID } from '../../interfaces';
import { RestActionItem, ActionIconWrapper, ActionLabel } from '../style';

interface IRestActionsProps {
  action: IRowAction;
  onActionClick(e: any, actionId: TID): void;
}

export default function RestAction(props: IRestActionsProps) {
  const { action, onActionClick } = props;
  const { id, label, icon: Icon } = action;

  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onActionClick(e, id);
    },
    [onActionClick, id]
  );

  return (
    <RestActionItem key={id} onClick={onClick}>
      {Icon && (
        <ActionIconWrapper>
          <Icon />
        </ActionIconWrapper>
      )}
      <ActionLabel>{label || id}</ActionLabel>
    </RestActionItem>
  );
}
