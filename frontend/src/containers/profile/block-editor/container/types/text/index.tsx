import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSubmitBlockForm } from 'src/api/hooks/submit-forms/block/useSubmitBlockForm';
import { Form } from 'src/components/form';
import { Tabs, TabContainer, useTabs } from 'src/components/tabs';

import { FormWrapper } from '../../style';
import { SettingsTab } from '../settings-tab';

import { TextFormWrapper } from './style';
import { useMapStoreToProps } from './selectors';
import { FormInputs, RawData } from './interfaces';
import { prepareDataForServer, blockTabs, TabValue } from './utils';
import { TextBlockFields } from './fields';

interface IProps {
  pageSlug?: string;
  templateSlug?: string;
  blockType: string;
  blockId: number | 'new';
  onSuccess(data: any): void;
  onCancel(): void;
  onClose(): void;
  isCloning: boolean;
  setIsCloning(isCloning: boolean): void;
  blockIndex?: number;
}

export const TextForm = observer((props: IProps) => {
  const {
    pageSlug,
    templateSlug,
    blockType,
    blockId,
    onSuccess,
    onCancel,
    onClose,
    isCloning,
    setIsCloning,
    blockIndex,
  } = props;
  const { formDefaultValues, deleteBlockAction } = useMapStoreToProps();
  const [tabs, activeTab, onChangeTab] = useTabs(blockTabs);
  const methods = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { formState, setError, handleSubmit } = methods;
  const { isValid } = formState;
  const [submitBlockEditor, isLoading, data, errors] = useSubmitBlockForm<FormInputs>();
  const isEditing = blockId !== 'new' && !isCloning;

  const submit = async (formInputs: FormInputs) => {
    const rawData: RawData = { formInputs, pageSlug, templateSlug, blockType };

    if (isEditing) {
      rawData.blockId = blockId as number;
    }

    if (blockIndex !== undefined) {
      rawData.index = blockIndex;
    }

    await submitBlockEditor(prepareDataForServer(rawData));
  };

  // форма успешно (без ошибок) отправлена
  useEffect(() => {
    if (!isLoading && formState.isSubmitSuccessful && !errors && data) {
      onSuccess(data); // При УСПЕШНОЙ отправке формы закрываем ее
      onClose();
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
        // тут фому не закрываем так как с бэка могли вернуться ошибки
        break;
      case 'cancel':
        isEditing ? onClose() : onCancel();
        break;
      case 'delete':
        deleteBlockAction(blockId as number);
        onClose();
        break;
      case 'clone':
        console.log('CLONE');
        setIsCloning(true);
        break;
      default:
        console.warn('Unknown action type', actionId);
    }
  };

  const onDeleteBlock = () => {
    deleteBlockAction(blockId as number);
    onClose();
  };

  const onCloneBlock = () => {
    console.log('CLONE');
    setIsCloning(true);
  };

  const toggleHideBlock = () => {
    console.log('toggle hide');
  };

  return (
    <TextFormWrapper>
      <Tabs tabs={tabs} activeTab={activeTab} onChangeTab={onChangeTab} />
      <Form onAction={onAction} isValid={isValid} submitActionLabel='Сохранить'>
        <FormProvider {...methods}>
          <FormWrapper>
            <TabContainer value={TabValue.text} activeTabValue={activeTab.value}>
              <TextBlockFields formDefaultValues={formDefaultValues} />
            </TabContainer>
            <TabContainer value={TabValue.preview} activeTabValue={activeTab.value}>
              Tab preview content
            </TabContainer>
            <TabContainer value={TabValue.settings} activeTabValue={activeTab.value}>
              <SettingsTab
                isLoading={isLoading}
                isVisible={formDefaultValues?.isVisible}
                toggleHide={toggleHideBlock}
                onClone={onCloneBlock}
                onRemove={onDeleteBlock}
              />
            </TabContainer>
          </FormWrapper>
        </FormProvider>
      </Form>
    </TextFormWrapper>
  );
});
