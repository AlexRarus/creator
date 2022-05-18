import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useForm, FormProvider } from 'react-hook-form';
import { Form } from 'src/components/form';
import { Tabs, TabContainer, useTabs } from 'src/components/tabs';
import { IButtonDataWrite } from 'src/dal/blocks/button-interfaces';
import { useSubmitBlockForm } from 'src/api/hooks/submit-forms/block/useSubmitBlockForm';

import { FormWrapper } from '../../style';
import { SettingsTab } from '../settings-tab';

import { FormInputs, RawData } from './interfaces';
import { useMapStoreToProps } from './selectors';
import { ButtonFormWrapper } from './style';
import { ButtonFields } from './fields';
import { ButtonKinds } from './kinds';
import { TabValue, blockTabs, prepareDataForServer } from './utils';

interface IProps {
  pageSlug?: string;
  templateSlug?: string;
  blockType: string;
  blockId: number | 'new';
  onSuccess(data: any): void;
  onCancel(): void;
  onClose(): void;
  blockIndex?: number;
}

export const ButtonForm = observer((props: IProps) => {
  const {
    pageSlug,
    templateSlug,
    blockType,
    blockId,
    onSuccess,
    onCancel,
    onClose,
    blockIndex,
  } = props;
  const [tabs, activeTab, onChangeTab] = useTabs(blockTabs);
  const {
    formDefaultValues,
    deleteBlockAction,
    getButtonTypesListAction,
    buttonTypes,
  } = useMapStoreToProps();
  // todo хук useForm создает форму и возвращает методы и состояние формы
  // todo все поля зарегистрированные в форме управляются этой формой
  // todo поле можно зарегистрировать (например) при помощи обертки <ControlledField> и "methods.control"
  const methods = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { formState, handleSubmit, setError } = methods;
  const { isValid } = formState;
  const [submitBlockEditor, isLoading, data, errors] = useSubmitBlockForm<IButtonDataWrite>();
  const isEditing = blockId !== 'new';

  useEffect(() => {
    getButtonTypesListAction();
  }, []);

  const submit = async (formInputs: FormInputs) => {
    const rawData: RawData = {
      formInputs,
      pageSlug,
      templateSlug,
      blockType,
    };

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
        // тут фому НЕ закрываем так как с бэка могли вернуться ошибки
        break;
      case 'cancel':
        isEditing ? onClose() : onCancel();
        break;
      case 'delete':
        deleteBlockAction(blockId as number);
        onClose();
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
  };

  const toggleHideBlock = () => {
    console.log('toggle hide');
  };

  return (
    <ButtonFormWrapper>
      <Tabs tabs={tabs} activeTab={activeTab} onChangeTab={onChangeTab} />
      <Form onAction={onAction} isValid={isValid} submitActionLabel='Сохранить'>
        <FormProvider {...methods}>
          <FormWrapper>
            <TabContainer value={TabValue.button} activeTabValue={activeTab.value}>
              <ButtonFields buttonTypes={buttonTypes} formDefaultValues={formDefaultValues} />
            </TabContainer>
            <TabContainer value={TabValue.kind} activeTabValue={activeTab.value}>
              <ButtonKinds />
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
    </ButtonFormWrapper>
  );
});
