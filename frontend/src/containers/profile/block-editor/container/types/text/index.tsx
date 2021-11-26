import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSubmitBlockForm } from 'src/api/hooks/submit-forms/block/useSubmitBlockForm';
import { ModalFormButtons } from 'src/components/modal-form-buttons';

import { FormWrapper } from '../../style';
import { blockActions } from '../../constants';

import { useMapStoreToProps } from './selectors';
import { FormInputs } from './interfaces';
import { prepareDataForServer } from './utils';
import { TextBlockFields } from './fields';

interface IProps {
  username: string;
  pageSlug: string;
  blockType: string;
  blockId: string;
  onSuccess(data: any): void;
  onCancel(): void;
}

export const TextForm = observer((props: IProps) => {
  const { pageSlug, blockType, blockId, onSuccess, onCancel } = props;
  const { formDefaultValues } = useMapStoreToProps();
  // todo хук useForm создает форму и возвращает методы и состояние формы
  // todo все поля зарегистрированные в форме управляются этой формой
  // todo поле можно зарегистрировать (например) при помощи обертки <ControlledField> и "methods.control"
  const methods = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { formState, setError, handleSubmit } = methods;
  const { isValid } = formState;
  const [submitBlockEditor, isLoading, data, errors] = useSubmitBlockForm<FormInputs>();

  const submit = async (data: FormInputs) => {
    const rawData: any = { data, pageSlug, blockType };

    if (blockId !== 'new') {
      rawData.blockId = blockId;
    }

    await submitBlockEditor(prepareDataForServer(rawData));
  };
  const onSubmit = () => handleSubmit(submit)();

  // форма успешно (без ошибок) отправлена
  useEffect(() => {
    if (!isLoading && formState.isSubmitSuccessful && !errors && data) {
      onSuccess(data);
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

  const onActionClick = (actionId: string) => {
    console.log('[BLOCK] onActionClick:', actionId);
  };

  return (
    <FormProvider {...methods}>
      <FormWrapper>
        <TextBlockFields formDefaultValues={formDefaultValues} />
        <ModalFormButtons
          onSubmit={onSubmit}
          actions={blockActions}
          onActionClick={onActionClick}
          isValid={isValid}
        />
      </FormWrapper>
    </FormProvider>
  );
});
