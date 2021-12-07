import React, { useEffect } from 'react';
import Modal, { MobileSize } from 'src/components/modal';
import { Form } from 'src/components/form';
import { useForm } from 'react-hook-form';
import InputText from 'src/components/input-text';
import { ControlledField } from 'src/components/controlled-field';
import { useSubmitEmailForm } from 'src/api/hooks/submit-forms/auth/useSubmitEmailForm';
import { IUser } from 'src/dal/auth/interfaces';
import { email as emailVal, required } from 'src/utils/validators';

import { FormInputs, RawData } from './interfaces';
import { prepareDataForServer } from './utils';

interface IProps {
  onClose(): void;
  user: IUser;
  onSuccess?(data: any): void;
}

export const ChangeEmailModal = (props: IProps) => {
  const { onClose, onSuccess } = props;
  const { handleSubmit, formState, setError, control } = useForm<FormInputs>();
  const { isValid } = formState;
  const [submitEmailForm, isLoading, data, errors] = useSubmitEmailForm<Record<any, any>>();

  const submit = async (data: FormInputs) => {
    const rawData: RawData = { ...data };

    await submitEmailForm(prepareDataForServer(rawData));
  };

  // форма успешно (без ошибок) отправлена
  useEffect(() => {
    if (!isLoading && formState.isSubmitSuccessful && !errors && data) {
      onSuccess && onSuccess(data as any);
      onClose(); // При УСПЕШНОЙ отправке формы закрываем ее
    }
  }, [formState, errors, data, isLoading]);

  // заполнение формы ошибками валидации пришедшими с бэка
  useEffect(() => {
    if (errors) {
      const fieldNames = Object.keys(errors);
      fieldNames.forEach((fieldName: any) =>
        setError(fieldName, {
          type: 'server',
          message: errors[fieldName][0],
        })
      );
    }
  }, [errors, setError]);

  const onAction = (actionId: string) => {
    switch (actionId) {
      case 'submit':
        handleSubmit(submit)();
        // тут форму НЕ закрываем так как с бэка могли вернуться ошибки
        break;
      case 'cancel':
        onClose();
        break;
      default:
        console.warn('Unknown action type', actionId);
    }
  };

  return (
    <Modal onClose={onClose} mobileSize={MobileSize.L} title='Изменение электронной почты'>
      <Form onAction={onAction} isValid={isValid} isLoading={isLoading}>
        <ControlledField
          name='newEmail'
          control={control}
          rules={{
            ...required(),
            ...emailVal(),
          }}>
          <InputText label='Введите новую почту' />
        </ControlledField>
        <ControlledField
          name='currentPassword'
          control={control}
          rules={{
            ...required(),
          }}>
          <InputText label='Пароль' />
        </ControlledField>
      </Form>
    </Modal>
  );
};
