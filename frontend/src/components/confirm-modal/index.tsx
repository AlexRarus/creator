import React from 'react';
import Modal from 'src/components/modal';
import Button, { ButtonsList } from 'src/components/button';

interface IProps {
  onClose(): void;
  onConfirm(data?: any): void;
  confirmLabel?: string;
  message?: string;
  data?: any;
}

export function ConfirmModal(props: IProps) {
  const {
    onClose,
    onConfirm,
    confirmLabel = 'Подтвердить',
    message = 'Подтвердите действие',
    data,
  } = props;

  const confirmHandler = () => {
    onConfirm(data);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div>{message}</div>
      <ButtonsList marginTop={20}>
        <Button onClick={confirmHandler} kind='primary' dimension='s'>
          {confirmLabel}
        </Button>
        <Button onClick={onClose} kind='secondary' dimension='s'>
          Отмена
        </Button>
      </ButtonsList>
    </Modal>
  );
}
