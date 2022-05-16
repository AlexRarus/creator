import React from 'react';
import Modal, { DesktopSize, MobileSize } from 'src/components/modal';
import { DesktopView, MobileView } from 'src/style';

import { IButton, Button } from './button';
import {
  DesktopButtonsList,
  MobileButtonsList,
  FormButtonsWrapper,
  ConfirmContent,
  ConfirmMessage,
} from './style';

export interface IConfirmButton extends IButton {
  label: string;
}

interface IProps {
  onConfirm?(data: any): void;
  onCancel?(data: any): void;
  onClose(): void;
  confirmTitle: string;
  confirmMessage: string;
  confirmButton?: IConfirmButton;
  [key: string]: any;
}

export const Confirm = (props: IProps) => {
  const {
    onConfirm,
    onCancel,
    onClose,
    confirmTitle,
    confirmMessage,
    confirmButton = { kind: 'primary', label: 'Подтвердить' },
    ...data
  } = props;

  const confirmHandler = () => {
    onConfirm && onConfirm(data);
    onClose();
  };

  const cancelHandler = () => {
    onCancel && onCancel(data);
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
              <Button kind='secondary' hasBorder={false} onClick={cancelHandler}>
                <span>Отмена</span>
              </Button>
              <Button
                kind={confirmButton?.kind || 'primary'}
                {...confirmButton}
                hasBorder={false}
                onClick={confirmHandler}>
                {confirmButton?.label || 'Подтвердить'}
              </Button>
            </MobileButtonsList>
          </MobileView>
          <DesktopView>
            <DesktopButtonsList>
              <Button kind='secondary' onClick={cancelHandler}>
                <span>Отмена</span>
              </Button>
              <Button
                kind={confirmButton?.kind || 'primary'}
                {...confirmButton}
                onClick={confirmHandler}>
                {confirmButton?.label || 'Подтвердить'}
              </Button>
            </DesktopButtonsList>
          </DesktopView>
        </FormButtonsWrapper>
      </ConfirmContent>
    </Modal>
  );
};
