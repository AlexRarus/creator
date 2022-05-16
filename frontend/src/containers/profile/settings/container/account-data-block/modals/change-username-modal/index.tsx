import React, { useEffect } from 'react';
import Modal, { MobileSize } from 'src/components/modal';
import { Form } from 'src/components/form';
import { useForm } from 'react-hook-form';
import InputText from 'src/components/input-text';
import { ControlledField } from 'src/components/controlled-field';
import { useSubmitUsernameForm } from 'src/api/hooks/submit-forms/auth/useSubmitUsernameForm';
import { IUser } from 'src/dal/auth/interfaces';
import { required } from 'src/utils/validators';

import { FormInputs, RawData } from './interfaces';
import { prepareDataForServer } from './utils';
import { useValidateUsername } from './hooks';

interface IProps {
  onClose(): void;
  user: IUser;
  onSuccess?(data: any): void;
}

export const ChangeUsernameModal = (props: IProps) => {
  const { onClose, onSuccess, user } = props;
  const { handleSubmit, formState, setError, control, watch } = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      username: user?.username || '',
    },
  });
  const { isValid, isDirty } = formState;
  const [submitUsernameForm, isLoading, data, errors] = useSubmitUsernameForm<Record<any, any>>();
  const username = watch('username');
  const usernameErrors = useValidateUsername(isDirty, user, username);

  const submit = async (data: FormInputs) => {
    const rawData: RawData = { ...data };

    await submitUsernameForm(prepareDataForServer(rawData));
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
    if (errors || usernameErrors) {
      const combineErrors: any = errors || usernameErrors;
      const fieldNames = Object.keys(combineErrors);
      fieldNames.forEach((fieldName: any) =>
        setError(fieldName, {
          type: 'server',
          message: combineErrors[fieldName][0],
        })
      );
    }
  }, [errors, usernameErrors, setError]);

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
    <Modal onClose={onClose} mobileSize={MobileSize.L} title='Изменение имени пользователя'>
      <Form onAction={onAction} isValid={isValid} isLoading={isLoading}>
        <ControlledField
          name='username'
          control={control}
          rules={{
            ...required(),
          }}>
          <InputText label='Придумайте новое имя пользователя' />
        </ControlledField>
      </Form>
    </Modal>
  );
};
