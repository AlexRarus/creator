import React, { useEffect } from 'react';
import Modal from 'src/components/modal';
import { useForm, FormProvider } from 'react-hook-form';
import { useSubmitTemplateForm } from 'src/api/hooks/submit-forms/template/useSubmitTemplateForm';
import { Form } from 'src/components/form';

import { FormInputs, RawData } from './interfaces';
import { prepareDataForServer } from './utils';
import { AddTemplateFields } from './fields';

interface IProps {
  templateType: string;
  onClose(): void;
  onSuccess(data: any): void;
}

export const AddTemplateModal = (props: IProps) => {
  const { templateType, onClose, onSuccess } = props;
  // todo хук useForm создает форму и возвращает методы и состояние формы
  // todo все поля зарегистрированные в форме управляются этой формой
  // todo поле можно зарегистрировать (например) при помощи обертки <ControlledField> и "methods.control"
  const methods = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { formState, setError, handleSubmit } = methods;
  const { isValid } = formState;
  const [submitTemplateForm, isLoading, data, errors] = useSubmitTemplateForm<FormInputs>();

  const submit = async (data: FormInputs) => {
    const rawData: RawData = { ...data };

    await submitTemplateForm(prepareDataForServer(rawData, templateType));
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
    <Modal onClose={onClose} title='Добавление шаблона'>
      <Form onAction={onAction} isValid={isValid}>
        <FormProvider {...methods}>
          <AddTemplateFields />
        </FormProvider>
      </Form>
    </Modal>
  );
};
