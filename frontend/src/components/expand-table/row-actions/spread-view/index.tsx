import React from 'react';

import { IRowAction, TID } from '../../interfaces';
import { SpreadActionsWrapper, SpreadActionsList } from '../style';

import SpreadAction from './action-item';

interface ISpreadActionsProps {
  actions: IRowAction[];
  onClick(actionId: TID): void;
}

export default function SpreadActions(props: ISpreadActionsProps) {
  const { actions, onClick } = props;

  const onActionClick = (actionId: TID) => {
    onClick(actionId);
  };

  return (
    <SpreadActionsWrapper>
      <SpreadActionsList>
        {actions.map((action: IRowAction) => (
          <SpreadAction key={action.id} action={action} onActionClick={onActionClick} />
        ))}
      </SpreadActionsList>
    </SpreadActionsWrapper>
  );
}
