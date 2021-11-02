import React from 'react';
import Button, { ButtonsList } from 'src/components/button';

import { IRemoveConfirmProps } from './interfaces';

export default function RemoveConfirm(props: IRemoveConfirmProps) {
  const { remove, close } = props;

  return (
    <div>
      <div>Вы точно хотите удалить элемент?</div>
      <ButtonsList marginTop={20}>
        <Button onClick={remove} kind='primary' dimension='s'>
          Удалить
        </Button>
        <Button onClick={close} kind='secondary' dimension='s'>
          Отмена
        </Button>
      </ButtonsList>
    </div>
  );
}
