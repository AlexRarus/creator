import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MobileView, DesktopView } from 'src/style';
import Popup from 'src/components/popup';

import { ActionConfirmModal } from './confirm/action-confirm';
import { MobileActions } from './mobile-actions';
import { ModalButton } from './modal-button';
import { ActionButton } from './action-button';
import type { IAction } from './action-button/interfaces';
export type { IAction } from './action-button/interfaces';
import {
  ModalFormButtonsWrapper,
  DesktopButtonsList,
  MobileButtonsList,
  ActionsList,
} from './style';

interface IProps {
  onSubmit(): void;
  submitLabel?: string;
  actions?: IAction[];
  onActionClick?(actionId: string): void;
  isValid?: boolean;
}

/**
 * Кнопки для управления формой (задумывались для модального окна)
 * Умеют рендериться под десктоп и мобилку
 * Можно передавать различные Экшены над формой
 * Можно Вызывать подтверждение экшенов (например перед удалением)
 * @param props
 * @constructor
 */
export const ModalFormButtons = (props: IProps) => {
  const { submitLabel = 'Отправить', actions, onSubmit, onActionClick, isValid = true } = props;
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
      onActionClick && onActionClick(action.id);
      closeMobileActions();
      closeDesktopActions();
    }
  };

  const onConfirmAction = (action: IAction) => {
    setConfirmAction(null);
    closeMobileActions();
    closeDesktopActions();
    onActionClick && onActionClick(action.id);
  };
  const onCancelConfirm = () => setConfirmAction(null);

  return (
    <ModalFormButtonsWrapper>
      <MobileView>
        <MobileButtonsList>
          <ModalButton
            kind='secondary'
            hasBorder={false}
            disabled={!actions?.length}
            onClick={openMobileActions}>
            <MoreVertIcon />
            <span>Действие</span>
          </ModalButton>
          <ModalButton kind='primary' hasBorder={false} onClick={onSubmit} disabled={!isValid}>
            {submitLabel}
          </ModalButton>
        </MobileButtonsList>
        {isOpenMobileActions && (
          <MobileActions
            onClose={closeMobileActions}
            actions={actions}
            onActionClick={actionClickHandler}
          />
        )}
      </MobileView>
      <DesktopView>
        <DesktopButtonsList>
          <ModalButton
            kind='secondary'
            disabled={!actions?.length}
            ref={desktopActionsRefCallback}
            onClick={toggleDesktopActions}>
            <MoreVertIcon />
            <span>Действие</span>
          </ModalButton>
          <ModalButton kind='primary' onClick={onSubmit} disabled={!isValid}>
            {submitLabel}
          </ModalButton>
        </DesktopButtonsList>
        <Popup
          isOpen={isOpenDesktopActions}
          onClose={closeDesktopActions}
          openerElement={desktopActionsElement}
          horizontalAlign='center'
          verticalAlign='center'
          position='bottom'
          maxHeight={320}
          plateMargin={3}
          zIndex={999}
          hasPointer={false}>
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
      </DesktopView>
      {confirmAction && (
        <ActionConfirmModal
          action={confirmAction}
          onClose={onCancelConfirm}
          onConfirm={onConfirmAction}
        />
      )}
    </ModalFormButtonsWrapper>
  );
};
