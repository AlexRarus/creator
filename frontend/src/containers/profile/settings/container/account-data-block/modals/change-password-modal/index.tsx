import React, { useEffect } from 'react';
import Modal, { MobileSize } from 'src/components/modal';
import { Form } from 'src/components/form';
import { useForm } from 'react-hook-form';
import InputText from 'src/components/input-text';
import { ControlledField } from 'src/components/controlled-field';
import { useSubmitPasswordForm } from 'src/api/hooks/submit-forms/auth/useSubmitPasswordForm';
import { required } from 'src/utils/validators';

import { FormInputs, RawData } from './interfaces';
import { prepareDataForServer } from './utils';

interface IProps {
  onClose(): void;
  onSuccess?(data: any): void;
}

export const ChangePasswordModal = (props: IProps) => {
  const { onClose, onSuccess } = props;
  const { handleSubmit, formState, setError, control } = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { isValid } = formState;
  const [submitPasswordForm, isLoading, data, errors] = useSubmitPasswordForm<Record<any, any>>();

  const submit = async (data: FormInputs) => {
    const rawData: RawData = { ...data };

    await submitPasswordForm(prepareDataForServer(rawData));
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
    <Modal onClose={onClose} mobileSize={MobileSize.L} title='Изменение пароля'>
      <Form onAction={onAction} isValid={isValid} isLoading={isLoading}>
        <ControlledField
          name='currentPassword'
          control={control}
          rules={{
            ...required(),
          }}>
          <InputText label='Текущий пароль' />
        </ControlledField>
        <ControlledField
          name='newPassword'
          control={control}
          rules={{
            ...required(),
          }}>
          <InputText label='Придумайте новый пароль' />
        </ControlledField>
      </Form>
    </Modal>
  );
};
