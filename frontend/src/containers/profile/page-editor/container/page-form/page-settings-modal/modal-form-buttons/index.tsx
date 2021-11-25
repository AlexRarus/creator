import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MobileView, DesktopView } from 'src/style';
import Popup from 'src/components/popup';

import { ModalButton } from './modal-button';
import { ActionButton } from './action-button';
import type { IAction } from './action-button';
export type { IAction } from './action-button';
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

export const ModalFormButtons = (props: IProps) => {
  const { submitLabel = 'Отправить', actions, onSubmit, onActionClick, isValid = true } = props;
  const [isOpenDesktopActions, setIsOpenDesktopActions] = useState(false);
  const [isOpenMobileActions, setIsOpenMobileActions] = useState(false);
  const [desktopActionsElement, desktopActionsRefCallback] = useState<HTMLElement | null>(null);
  const [mobileActionsElement, mobileActionsRefCallback] = useState<HTMLElement | null>(null);
  const [mobileActionsButtonWidth, setMobileActionsButtonWidth] = useState(0);
  const [desktopActionsButtonWidth, setDesktopActionsButtonWidth] = useState(0);

  useEffect(() => {
    if (mobileActionsElement) {
      setMobileActionsButtonWidth(mobileActionsElement.getBoundingClientRect().width);
    }
    if (desktopActionsElement) {
      setDesktopActionsButtonWidth(desktopActionsElement.getBoundingClientRect().width);
    }
  }, [mobileActionsElement, desktopActionsElement]);

  const toggleMobileActions = () => setIsOpenMobileActions((isOpen: boolean) => !isOpen);
  const closeMobileActions = () => setIsOpenMobileActions(false);

  const toggleDesktopActions = () => setIsOpenDesktopActions((isOpen: boolean) => !isOpen);
  const closeDesktopActions = () => setIsOpenDesktopActions(false);

  return (
    <ModalFormButtonsWrapper>
      <MobileView>
        <MobileButtonsList>
          <ModalButton
            kind='secondary'
            isBlock={true}
            disabled={!actions?.length}
            ref={mobileActionsRefCallback}
            onClick={toggleMobileActions}>
            <MoreVertIcon />
            <span>Действие</span>
          </ModalButton>
          <ModalButton kind='primary' isBlock={true} onClick={onSubmit} disabled={!isValid}>
            {submitLabel}
          </ModalButton>
        </MobileButtonsList>
        <Popup
          isOpen={isOpenMobileActions}
          onClose={closeMobileActions}
          openerElement={mobileActionsElement}
          horizontalAlign='start'
          verticalAlign='start'
          position='top'
          maxHeight={320}
          plateMargin={0}
          zIndex={999}
          hasBorder={false}
          hasShadow={false}
          borderRadius='0 4px 0 0'
          hasPointer={false}>
          <ActionsList width={mobileActionsButtonWidth} isMobile={true}>
            {actions?.map((action: IAction) => (
              <ActionButton key={action.id} {...action} onClick={onActionClick}>
                {action.label}
              </ActionButton>
            ))}
          </ActionsList>
        </Popup>
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
              <ActionButton key={action.id} {...action} onClick={onActionClick}>
                {action.label}
              </ActionButton>
            ))}
          </ActionsList>
        </Popup>
      </DesktopView>
    </ModalFormButtonsWrapper>
  );
};
