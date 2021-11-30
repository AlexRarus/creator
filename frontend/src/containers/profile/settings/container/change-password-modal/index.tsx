import React, { useEffect } from 'react';
import Modal from 'src/components/modal';
import { useForm, FormProvider } from 'react-hook-form';
import { useSubmitSetPasswordForm } from 'src/api/hooks/submit-forms/auth/useSubmitSetPasswordForm';
import { Form } from 'src/components/form';

import { FormInputs, RawData } from './interfaces';
import { prepareDataForServer } from './utils';
import { ChangePasswordFields } from './fields';

interface IProps {
  onClose(): void;
  onSuccess(data: any): void;
}

export const ChangePasswordModal = (props: IProps) => {
  const { onClose, onSuccess } = props;
  const methods = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { formState, setError, handleSubmit } = methods;
  const { isValid } = formState;
  const [submitSetPasswordForm, isLoading, data, errors] = useSubmitSetPasswordForm<FormInputs>();

  const submit = async (data: FormInputs) => {
    const rawData: RawData = { ...data };

    await submitSetPasswordForm(prepareDataForServer(rawData));
  };

  // форма успешно (без ошибок) отправлена
  useEffect(() => {
    if (!isLoading && formState.isSubmitSuccessful && !errors && data) {
      onSuccess(data as any);
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
        // тут фому НЕ закрываем так как с бэка могли вернуться ошибки
        break;
      case 'cancel':
        onClose();
        break;
      default:
        console.warn('Unknown action type', actionId);
    }
  };

  return (
    <Modal onClose={onClose} title='Изменение пароля'>
      <Form onAction={onAction} isValid={isValid}>
        <FormProvider {...methods}>
          <ChangePasswordFields />
        </FormProvider>
      </Form>
    </Modal>
  );
};
