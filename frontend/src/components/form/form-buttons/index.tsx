import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BrowserView, MobileView } from 'react-device-detect';
import Popup from 'src/components/popup';
import { Loader } from 'src/components/loader';
import { COLORS } from 'src/components/theme';
import Button from 'src/components/button';

import { ActionConfirmModal } from './confirm/action-confirm';
import { MobileActions } from './mobile-actions';
// import { Button } from './button';
import { ActionButton } from './action-button';
import type { IAction } from './action-button/interfaces';
import {
  FormButtonsWrapper,
  DesktopButtonsList,
  MobileButtonsListWrapper,
  MobileButtonsList,
  ActionsList,
} from './style';

export type { IAction } from './action-button/interfaces';

interface IProps {
  onAction(actionId: string): void;
  submitActionLabel?: string;
  actions?: IAction[];
  isValid?: boolean;
  isLoading?: boolean;
}

/**
 * Кнопки для управления формой
 * Умеют рендериться под десктоп и мобилку
 * Можно передавать различные Экшены над формой
 * Можно Вызывать подтверждение экшенов (например перед удалением)
 * @param props
 * @constructor
 */
export const FormButtons = (props: IProps) => {
  const {
    submitActionLabel = 'Отправить',
    actions,
    onAction,
    isValid = true,
    isLoading = false,
  } = props;
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
      onAction(action.id);
    }
  };

  const onConfirmAction = (action: IAction) => {
    setConfirmAction(null);
    closeMobileActions();
    closeDesktopActions();
    onAction(action.id);
  };
  const onCancelConfirm = () => setConfirmAction(null);

  return (
    <FormButtonsWrapper>
      <MobileView>
        <MobileButtonsListWrapper>
          <MobileButtonsList>
            {!actions?.length && (
              <Button
                kind='based'
                hasBorder={false}
                onClick={() => onAction('cancel')}
                disabled={isLoading}>
                <span>Отмена</span>
              </Button>
            )}
            {actions?.length === 1 && (
              <Button
                {...actions[0]}
                kind='based'
                onClick={() => actionClickHandler(actions[0])}
                disabled={isLoading}>
                <span>{actions[0].label}</span>
              </Button>
            )}
            {actions && actions.length > 1 && (
              <Button
                kind='based'
                disabled={!actions?.length || isLoading}
                onClick={openMobileActions}>
                <MoreVertIcon />
                <span>Действие</span>
              </Button>
            )}
            <Button
              kind='based'
              onClick={() => onAction('submit')}
              disabled={!isValid || isLoading}>
              {isLoading && <Loader type='ring' size={30} color={COLORS.blue[300]} />}
              {submitActionLabel}
            </Button>
          </MobileButtonsList>
        </MobileButtonsListWrapper>
        {isOpenMobileActions && (
          <MobileActions
            onClose={closeMobileActions}
            actions={actions}
            onActionClick={actionClickHandler}
          />
        )}
      </MobileView>
      <BrowserView>
        <DesktopButtonsList>
          {!actions?.length && (
            <Button kind='based' onClick={() => onAction('cancel')} disabled={isLoading}>
              <span>Отмена</span>
            </Button>
          )}
          {actions?.length === 1 && (
            <Button
              {...actions[0]}
              kind='based'
              onClick={() => actionClickHandler(actions[0])}
              disabled={isLoading}>
              <span>{actions[0].label}</span>
            </Button>
          )}
          {actions && actions.length > 1 && (
            <Button
              kind='based'
              disabled={!actions?.length || isLoading}
              ref={desktopActionsRefCallback}
              onClick={toggleDesktopActions}>
              <MoreVertIcon />
              <span>Действие</span>
            </Button>
          )}
          <Button kind='based' onClick={() => onAction('submit')} disabled={!isValid || isLoading}>
            {isLoading && <Loader type='ring' size={30} color={COLORS.blue[300]} />}
            {submitActionLabel}
          </Button>
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
      </BrowserView>
      {confirmAction && (
        <ActionConfirmModal
          action={confirmAction}
          onClose={onCancelConfirm}
          onConfirm={onConfirmAction}
        />
      )}
    </FormButtonsWrapper>
  );
};
