import React, { forwardRef, SyntheticEvent, useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popup from 'src/components/popup';
import { isMobile } from 'react-device-detect';

import { ActionsWrapper, ActionsButton, ActionsList } from './style';
import { ActionConfirmModal } from './confirm/action-confirm';
import { ActionButton } from './action-button';
import { MobileActions } from './mobile-actions';
import { ActionIcon } from './action-icon';

export type ActionKind = 'primary' | 'secondary' | 'delete';

export interface IAction {
  id: string;
  label: string;
  kind?: ActionKind;
  Icon?: any;
  disabled?: boolean;
  needConfirm?: boolean;
  confirmTitle?: any;
  confirmMessage?: any;
}

interface IProps {
  actions: IAction[];
  onAction(actionId: string): void;
  className?: string;
  withLayout?: boolean;
}

export const Actions = forwardRef((props: IProps, ref: any) => {
  const { actions, onAction, className, withLayout } = props;
  const [isOpenDesktopActions, setIsOpenDesktopActions] = useState(false);
  const [isOpenMobileActions, setIsOpenMobileActions] = useState(false);
  const [desktopActionsElement, desktopActionsRefCallback] = useState<HTMLElement | null>(null);
  const [desktopActionsButtonWidth, setDesktopActionsButtonWidth] = useState(0);
  const [confirmAction, setConfirmAction] = useState<IAction | null>(null);

  useEffect(() => {
    if (desktopActionsElement) {
      setDesktopActionsButtonWidth(desktopActionsElement.getBoundingClientRect().width);
    }
  }, [desktopActionsElement]);

  const openMobileActions = () => setIsOpenMobileActions(true);
  const closeMobileActions = () => setIsOpenMobileActions(false);

  const toggleDesktopActions = () => setIsOpenDesktopActions((isOpen: boolean) => !isOpen);
  const closeDesktopActions = () => setIsOpenDesktopActions(false);

  const actionClickHandler = (action: IAction) => {
    if (action.needConfirm) {
      setConfirmAction(action);
    } else {
      closeMobileActions();
      closeDesktopActions();
      onAction && onAction(action.id);
    }
  };

  const onConfirmAction = (action: IAction) => {
    setConfirmAction(null);
    closeMobileActions();
    closeDesktopActions();
    onAction && onAction(action.id);
  };
  const onCancelConfirm = () => setConfirmAction(null);

  const openActions = () => {
    if (isMobile) {
      openMobileActions();
    } else {
      toggleDesktopActions();
    }
  };

  return (
    <ActionsWrapper className={className} ref={ref}>
      {actions.length > 1 && (
        <ActionsButton
          onClick={openActions}
          ref={desktopActionsRefCallback}
          isActive={isOpenDesktopActions || isOpenMobileActions}>
          <MoreVertIcon />
        </ActionsButton>
      )}
      {actions.length === 1 && (
        <ActionsButton
          onClick={() => {
            actionClickHandler(actions[0]);
          }}>
          <ActionIcon action={actions[0]} />
        </ActionsButton>
      )}
      <Popup
        isOpen={isOpenDesktopActions}
        onClose={closeDesktopActions}
        openerElement={desktopActionsElement}
        position='bottom'
        maxHeight={320}
        plateMargin={3}
        zIndex={999}
        hasPointer={false}
        withLayout={withLayout}>
        <ActionsList width={desktopActionsButtonWidth}>
          {actions?.map((action: IAction) => (
            <ActionButton
              key={action.id}
              action={action}
              onClick={() => actionClickHandler(action)}
            />
          ))}
        </ActionsList>
      </Popup>
      {isOpenMobileActions && (
        <MobileActions
          onClose={closeMobileActions}
          actions={actions}
          onActionClick={actionClickHandler}
        />
      )}
      {confirmAction && (
        <ActionConfirmModal
          action={confirmAction}
          onClose={onCancelConfirm}
          onConfirm={onConfirmAction}
        />
      )}
    </ActionsWrapper>
  );
});

Actions.displayName = 'Actions';
