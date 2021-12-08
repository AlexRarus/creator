import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Modal, { MobileSize, DesktopSize } from 'src/components/modal';
import { useForm, FormProvider } from 'react-hook-form';
import { Form } from 'src/components/form';
import { ITheme } from 'src/dal/themes/interface';
import { COLORS } from 'src/components/theme';

import { FormInputs, RawData } from './interfaces';
// import { prepareDataForServer, pageTabs, getActions } from './utils';
import { useMapStoreToProps } from './selectors';
import { AddSectionContent } from './style';
import { SectionFields } from './fields';

interface IProps {
  onClose(): void;
  selectedTheme: ITheme | null;
  onSuccess(data?: any): void;
  previewList?: any[];
  sectionId?: any;
}

export const SectionModal = observer((props: IProps) => {
  const { onClose, onSuccess, sectionId, selectedTheme, previewList } = props;
  const [formDefaultValues] = useState({
    paddingTop: '20',
    paddingBottom: '20',
    paddingRight: '10',
    paddingLeft: '10',
    background: COLORS.deepPurple.A400,
    borderRadius: '0',
  });
  const { deleteBlockAction } = useMapStoreToProps();
  // todo хук useForm создает форму и возвращает методы и состояние формы
  // todo все поля зарегистрированные в форме управляются этой формой
  // todo поле можно зарегистрировать (например) при помощи обертки <ControlledField> и "methods.control"
  const methods = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { formState, handleSubmit } = methods;
  const { isValid } = formState;

  const submit = (formInputs: FormInputs) => {
    try {
      const rawData: RawData = { ...formInputs };

      onSuccess(rawData);

      // await createBlockAction(rawData);
      // await updateMyPageAction({ slug: selectedPage?.slug });
      onClose();
    } catch (error) {
      console.log('что-то пошло не так');
      onClose();
    }
  };

  const onAction = (actionId: string) => {
    switch (actionId) {
      case 'submit':
        handleSubmit(submit)();
        // тут фому НЕ закрываем так как с бэка могли вернуться ошибки
        break;
      case 'cancel':
        onClose();
        break;
      case 'delete':
        deleteBlockAction(sectionId);
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
      desktopSize={DesktopSize.M}
      padding={null}
      title='Настройки страницы'>
      <Form onAction={onAction} isValid={isValid}>
        <FormProvider {...methods}>
          <AddSectionContent>
            <SectionFields
              selectedTheme={selectedTheme}
              formDefaultValues={formDefaultValues}
              previewList={previewList}
            />
          </AddSectionContent>
        </FormProvider>
      </Form>
    </Modal>
  );
});
