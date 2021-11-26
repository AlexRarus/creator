import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSubmitBlockForm } from 'src/api/hooks/submit-forms/block/useSubmitBlockForm';
import { Form } from 'src/components/form';
import { Tabs, TabContainer, useTabs } from 'src/components/tabs';

import { FormWrapper } from '../../style';
import { blockActions } from '../../utils';

import { TextFormWrapper } from './style';
import { useMapStoreToProps } from './selectors';
import { FormInputs } from './interfaces';
import { prepareDataForServer, blockTabs, TabValue } from './utils';
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
  const [tabs, activeTab, onChangeTab] = useTabs(blockTabs);
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

  const onAction = (actionId: string) => {
    switch (actionId) {
      case 'submit':
        handleSubmit(submit)();
        break;
      case 'cancel':
        onCancel();
        break;
      case 'remove':
        console.log('remove block');
        break;
      case 'clone':
        console.log('clone block');
        break;
      default:
        console.warn('Unknown action type', actionId);
    }
  };

  return (
    <TextFormWrapper>
      <Tabs tabs={tabs} activeTab={activeTab} onChangeTab={onChangeTab} />
      <Form onAction={onAction} actions={blockId === 'new' ? [] : blockActions} isValid={isValid}>
        <FormProvider {...methods}>
          <FormWrapper>
            <TabContainer value={TabValue.text} activeTabValue={activeTab.value}>
              <TextBlockFields formDefaultValues={formDefaultValues} />
            </TabContainer>
            <TabContainer value={TabValue.settings} activeTabValue={activeTab.value}>
              Tab settings content
            </TabContainer>
            <TabContainer value={TabValue.section} activeTabValue={activeTab.value}>
              Tab section content
            </TabContainer>
          </FormWrapper>
        </FormProvider>
      </Form>
    </TextFormWrapper>
  );
});
