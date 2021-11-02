import React, { forwardRef, useState } from 'react';

import { IRow, IRowAction, TActionsView } from '../interfaces';

import RestActions from './rest-view';
import SpreadActions from './spread-view';
import { RowActionsWrapper } from './style';

interface IRowActionsProps<TRowData> {
  actions: IRowAction[];
  row: IRow<TRowData>;
  isHide?: boolean;
  onClick?(actionId: string, row: IRow<TRowData>): void;
  actionsView?: TActionsView;
  canHideActions?: boolean;
  isHeader?: boolean;
}

const RowActions = forwardRef((props: IRowActionsProps<any>, ref: any) => {
  const {
    actions,
    row,
    onClick,
    actionsView = 'rest',
    isHide = false,
    canHideActions,
    isHeader,
  } = props;
  const [isActive, setActiveBlock] = useState(false);

  const onActionClick = (actionId: string) => {
    !isHide && onClick && onClick(actionId, row);
  };

  return (
    <RowActionsWrapper
      canHideActions={canHideActions}
      isActive={isActive}
      isHide={isHide}
      isHeader={isHeader}
      ref={ref}
    >
      {actionsView === 'rest' ? (
        <RestActions
          actions={actions}
          rowId={row.id}
          onClick={onActionClick}
          setActiveBlock={setActiveBlock}
        />
      ) : (
        <SpreadActions actions={actions} onClick={onActionClick} />
      )}
    </RowActionsWrapper>
  );
});

RowActions.displayName = 'RowActions';

export default RowActions;
