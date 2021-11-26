import React from 'react';
import Modal, { DesktopSize, MobileSize } from 'src/components/modal';
import { DesktopView, MobileView } from 'src/style';

import { IAction } from '../action-button/interfaces';
import { IButton, Button } from '../button';
import { DesktopButtonsList, MobileButtonsList, FormButtonsWrapper } from '../style';

import { ConfirmContent, ConfirmMessage } from './style';

export interface IConfirmButton extends IButton {
  label: string;
}

interface IProps {
  action: IAction;
  onConfirm(action: IAction): void;
  onClose(): void;
}

export const ActionConfirmModal = (props: IProps) => {
  const { onConfirm, onClose, action } = props;
  const {
    confirmTitle = 'Подтвердите действие',
    confirmMessage = `Вы точно хотите ${action.label}?`,
    confirmButton = { label: action.label },
  } = action;

  const confirmHandler = () => {
    onConfirm(action);
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      mobileSize={MobileSize.S}
      desktopSize={DesktopSize.S}
      title={confirmTitle}
      padding={null}
      zIndex={1000}>
      <ConfirmContent>
        <ConfirmMessage>{confirmMessage}</ConfirmMessage>
        <FormButtonsWrapper>
          <MobileView>
            <MobileButtonsList>
              <Button kind='secondary' hasBorder={false} onClick={onClose}>
                <span>Отмена</span>
              </Button>
              <Button {...confirmButton} hasBorder={false} onClick={confirmHandler}>
                {confirmButton.label}
              </Button>
            </MobileButtonsList>
          </MobileView>
          <DesktopView>
            <DesktopButtonsList>
              <Button kind='secondary' onClick={onClose}>
                <span>Отмена</span>
              </Button>
              <Button {...confirmButton} onClick={confirmHandler}>
                {confirmButton.label}
              </Button>
            </DesktopButtonsList>
          </DesktopView>
        </FormButtonsWrapper>
      </ConfirmContent>
    </Modal>
  );
};
