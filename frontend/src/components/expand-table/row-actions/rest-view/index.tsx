import React, { useState, useRef, RefObject, useCallback } from 'react';
import MoreVert from '@material-ui/icons/MoreVert';
import { Popover } from '@material-ui/core';

import { IRowAction, TID } from '../../interfaces';
import {
  RestActionsWrapper,
  RestActionsButton,
  RestActionsList,
  usePopoverPaperStyle,
} from '../style';

import RestAction from './action-item';

interface IRestActionsProps {
  actions: IRowAction[];
  onClick(actionId: TID): void;
  rowId: TID;
  setActiveBlock(isActive: boolean): void;
}

export default function RestActions(props: IRestActionsProps) {
  const { actions, rowId, onClick, setActiveBlock } = props;
  const [isOpenActions, seOpenActions] = useState(false);
  const actionsRestButtonRef: RefObject<any> = useRef();
  const popoverPaperStyle = usePopoverPaperStyle();

  const openActions = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    seOpenActions(true);
    setActiveBlock(true);
  }, []);
  const closeActions = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    seOpenActions(false);
    setActiveBlock(false);
  }, []);

  const onActionClick = (e: any, actionId: string) => {
    onClick(actionId);
    closeActions(e);
  };

  return (
    <RestActionsWrapper>
      <RestActionsButton
        isOpenActions={isOpenActions}
        ref={actionsRestButtonRef}
        onClick={openActions}
      >
        <MoreVert />
      </RestActionsButton>
      <Popover
        classes={{
          paper: popoverPaperStyle.paper,
        }}
        id={`${rowId}-rest-actions`}
        open={isOpenActions}
        anchorEl={() => (actionsRestButtonRef as any) && actionsRestButtonRef.current}
        onClose={closeActions}
        transitionDuration={100}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <RestActionsList>
          {actions.map((action: IRowAction) => (
            <RestAction key={action.id} action={action} onActionClick={onActionClick} />
          ))}
        </RestActionsList>
      </Popover>
    </RestActionsWrapper>
  );
}
