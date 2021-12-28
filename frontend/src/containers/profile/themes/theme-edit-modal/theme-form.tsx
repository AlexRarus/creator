import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Form } from 'src/components/form';
import { useForm, FormProvider } from 'react-hook-form';
import { useSubmitThemeForm } from 'src/api/hooks/submit-forms/theme/useSubmitThemeForm';

import { useMapStoreToProps } from './selectors';
import { FormInputs, RawData } from './interfaces';
import { prepareDataForServer, getActions } from './utils';
import { FieldBlockBackground } from './fields-blocks/background';
import { FieldBlockFont } from './fields-blocks/font';

interface IProps {
  themeType: string;
  themeId: number | 'new';
  setThemeId(themeId: number | 'new'): void;
  onClose(): void;
  onSuccess?(data: any): void;
  onRemove?(): void;
}

export const ThemeForm = observer((props: IProps) => {
  const { themeType, themeId, setThemeId, onClose, onSuccess, onRemove } = props;
  const { formDefaultValues, isAuthor, deleteThemeAction } = useMapStoreToProps();
  const methods = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: formDefaultValues,
  });
  const { handleSubmit, formState } = methods;
  const [submitThemeForm, isLoading, data, errors] = useSubmitThemeForm();
  const isEditing = themeId !== 'new';

  const submit = async (formInputs: FormInputs) => {
    const rawData: RawData = {
      formInputs,
      themeType,
    };

    if (themeId !== 'new') {
      rawData.id = themeId;
    }

    await submitThemeForm(prepareDataForServer(rawData));
  };

  // форма успешно (без ошибок) отправлена
  useEffect(() => {
    if (!isLoading && formState.isSubmitSuccessful && !errors && data) {
      onSuccess && onSuccess(data as any);
      onClose(); // При УСПЕШНОЙ отправке формы закрываем ее
    }
  }, [formState, errors, data, isLoading]);

  const onAction = async (actionId: string) => {
    switch (actionId) {
      case 'submit':
        handleSubmit(submit)();
        // тут фому НЕ закрываем так как с бэка могли вернуться ошибки
        break;
      case 'clone':
        setThemeId('new');
        break;
      case 'delete':
        await deleteThemeAction(themeId as number);
        onRemove && onRemove();
        onClose();
        break;
      case 'cancel':
        onClose();
        break;
      default:
        console.warn('Unknown action type', actionId);
    }
  };

  return (
    <Form onAction={onAction} actions={getActions(isAuthor, isEditing)} isLoading={isLoading}>
      <FormProvider {...methods}>
        <FieldBlockBackground formDefaultValues={formDefaultValues} />
        <FieldBlockFont formDefaultValues={formDefaultValues} />
      </FormProvider>
    </Form>
  );
});
