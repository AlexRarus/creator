import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Modal, { MobileSize } from 'src/components/modal';
import { Form } from 'src/components/form';
import { useForm } from 'react-hook-form';
import { ControlledField } from 'src/components/controlled-field';
import { Grid, GridColumn } from 'src/components/grid';
import { useSubmitThemeForm } from 'src/api/hooks/submit-forms/theme/useSubmitThemeForm';
import { InputText } from 'src/components/input-text';
import { ColorPicker } from 'src/components/color-picker';
import { Select } from 'src/components/select';

import { useMapStoreToProps } from './selectors';
import { FormInputs, RawData } from './interfaces';
import { prepareDataForServer, getActions, backgroundTypes } from './utils';
import { ThemeEditorWrapper, Block, BlockTitle } from './style';

interface IProps {
  themeId: number | 'new';
  onClose(): void;
  onSuccess?(data: any): void;
  onRemove?(): void;
}

export const ThemeEditModal = observer((props: IProps) => {
  const { themeId: initThemeId, onClose, onSuccess, onRemove } = props;
  const [themeId, setThemeId] = useState(initThemeId);
  const {
    initialized,
    initAction,
    resetAction,
    formDefaultValues,
    isAuthor,
    deleteThemeAction,
  } = useMapStoreToProps();
  const { handleSubmit, formState, control, watch } = useForm<FormInputs>({
    defaultValues: formDefaultValues,
  });
  const backgroundType = watch('backgroundType');
  const [submitThemeForm, isLoading, data, errors] = useSubmitThemeForm();
  const isEditing = themeId !== 'new';

  useEffect(() => {
    initAction(initThemeId);

    return () => resetAction();
  }, [initThemeId]);

  const submit = async (formInputs: FormInputs) => {
    const rawData: RawData = {
      formInputs,
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
    <Modal
      onClose={onClose}
      mobileSize={MobileSize.L}
      title={`${isEditing ? 'Редактирование' : 'Создание'} темы`}
      isCloseOutside={false}>
      <ThemeEditorWrapper>
        {!initialized && 'Loading...'}
        {initialized && (
          <Form onAction={onAction} actions={getActions(isAuthor, isEditing)} isLoading={isLoading}>
            <Block>
              <BlockTitle>Фон</BlockTitle>
              <Grid verticalGap={10} staticSize={4}>
                <GridColumn size={2}>
                  <ControlledField name='backgroundType' control={control}>
                    <Select options={backgroundTypes} label='Тип фона' />
                  </ControlledField>
                </GridColumn>
                <GridColumn size={2}>
                  {backgroundType.value === 'color' && (
                    <ControlledField name='backgroundColor' control={control}>
                      <ColorPicker label='Цвет фона' />
                    </ControlledField>
                  )}
                  {backgroundType.value === 'gradient' && (
                    <ControlledField name='backgroundGradient' control={control}>
                      <InputText label='Градиент фона' />
                    </ControlledField>
                  )}
                </GridColumn>
                <GridColumn size={4}>
                  <ControlledField name='color' control={control}>
                    <InputText label='Цвет текста' />
                  </ControlledField>
                </GridColumn>
              </Grid>
            </Block>
          </Form>
        )}
      </ThemeEditorWrapper>
    </Modal>
  );
});
