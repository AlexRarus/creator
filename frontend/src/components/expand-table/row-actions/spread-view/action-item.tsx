import React, { useCallback } from 'react';

import { IRowAction, TID } from '../../interfaces';
import { SpreadActionItem, ActionIconWrapper, ActionLabel } from '../style';

interface ISpreadActionsProps {
  action: IRowAction;
  onActionClick(actionId: TID): void;
}

export default function SpreadAction(props: ISpreadActionsProps) {
  const { action, onActionClick } = props;
  const { id, label, icon: Icon, iconSize = 24 } = action;

  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onActionClick(id);
    },
    [onActionClick, id]
  );

  return (
    <SpreadActionItem key={id} onClick={onClick}>
      {Icon && (
        <ActionIconWrapper>
          <Icon size={iconSize} />
        </ActionIconWrapper>
      )}
      {!Icon && <ActionLabel>{label || id}</ActionLabel>}
    </SpreadActionItem>
  );
}
