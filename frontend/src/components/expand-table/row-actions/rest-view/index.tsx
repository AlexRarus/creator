import React, { useState, useCallback } from 'react';
import MoreVert from '@mui/icons-material/MoreVert';
import Popup from 'src/components/popup';

import { IRowAction, TID } from '../../interfaces';
import { RestActionsWrapper, RestActionsButton, RestActionsList } from '../style';

import RestAction from './action-item';

interface IRestActionsProps {
  actions: IRowAction[];
  onClick(actionId: TID): void;
  rowId: TID;
  setActiveBlock(isActive: boolean): void;
}

export default function RestActions(props: IRestActionsProps) {
  const { actions, onClick, setActiveBlock } = props;
  const [openerElement, openerRefCallback] = useState<HTMLElement | null>(null);
  const [isOpenActions, seOpenActions] = useState(false);

  const openActions = useCallback((e) => {
    seOpenActions(true);
    setActiveBlock(true);
  }, []);
  const closeActions = useCallback((e) => {
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
        ref={openerRefCallback}
        onClick={openActions}>
        <MoreVert />
      </RestActionsButton>
      <Popup
        position='bottom'
        verticalAlign='center'
        hasPointer={false}
        plateMargin={0}
        floatPosition={false}
        horizontalAlign='end'
        isCloseOnClick={true}
        isOpen={isOpenActions}
        openerElement={openerElement}
        onClose={closeActions}>
        <RestActionsList>
          {actions.map((action: IRowAction) => (
            <RestAction key={action.id} action={action} onActionClick={onActionClick} />
          ))}
        </RestActionsList>
      </Popup>
    </RestActionsWrapper>
  );
}
