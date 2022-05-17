import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useForm, FormProvider } from 'react-hook-form';
import { Form } from 'src/components/form';
import { Tabs, TabContainer, useTabs } from 'src/components/tabs';
import { useSubmitBlockForm } from 'src/api/hooks/submit-forms/block/useSubmitBlockForm';
import { IBlock } from 'src/dal/blocks/interfaces';
import { IUser } from 'src/dal/auth/interfaces';
import { ISectionDataWrite } from 'src/dal/blocks/section-interfaces';

import { FormWrapper } from '../../style';
import { SettingsTab } from '../settings-tab';

import { FormInputs, RawData } from './interfaces';
import { useMapStoreToProps } from './selectors';
import { SectionFormWrapper } from './style';
import { SectionFields } from './fields';
import { SectionPreview } from './preview';
import { TabValue, blockTabs, prepareDataForServer } from './utils';

interface IProps {
  pageSlug?: string;
  templateSlug?: string;
  blockType: string;
  blockId: number | 'new';
  onSuccess(data: any): void;
  onCancel(): void;
  onClose(): void;
  blockData?: any; // TODO для этой формы обязательно нужно передать { blocks: IBlock<any>[] }
  blockIndex?: number;
}

export const SectionForm = observer((props: IProps) => {
  const {
    pageSlug,
    templateSlug,
    blockType,
    blockId,
    onSuccess,
    onCancel,
    onClose,
    blockData,
    blockIndex,
  } = props;
  const [tabs, activeTab, onChangeTab] = useTabs(blockTabs);
  const { formDefaultValues, deleteBlockAction, user } = useMapStoreToProps();
  // todo хук useForm создает форму и возвращает методы и состояние формы
  // todo все поля зарегистрированные в форме управляются этой формой
  // todo поле можно зарегистрировать (например) при помощи обертки <ControlledField> и "methods.control"
  const methods = useForm<FormInputs>({
    defaultValues: formDefaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { formState, handleSubmit, setError } = methods;
  const { isValid } = formState;
  const [submitBlockEditor, isLoading, data, errors] = useSubmitBlockForm<ISectionDataWrite>(false);
  const isEditing = blockId !== 'new';
  const blocks = blockData?.blocks as IBlock<any>[]; // TODO Ожидаем { blocks: IBlock<any>[] }

  const submit = async (formInputs: FormInputs) => {
    const rawData: RawData = {
      formInputs,
      blocks: blocks.map((block: IBlock<any>) => block.id),
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
    <SectionFormWrapper>
      <Tabs tabs={tabs} activeTab={activeTab} onChangeTab={onChangeTab} />
      <FormWrapper>
        <Form onAction={onAction} isValid={isValid} submitActionLabel='Сохранить'>
          <FormProvider {...methods}>
            <TabContainer value={TabValue.section} activeTabValue={activeTab.value}>
              <SectionFields formDefaultValues={formDefaultValues} />
            </TabContainer>
            <TabContainer value={TabValue.preview} activeTabValue={activeTab.value}>
              <SectionPreview selectedTheme={user?.theme} blocks={blocks} user={user as IUser} />
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
          </FormProvider>
        </Form>
      </FormWrapper>
    </SectionFormWrapper>
  );
});
