import React from 'react';
import { observer } from 'mobx-react';
import Modal, { MobileSize, DesktopSize } from 'src/components/modal';
import { useForm, FormProvider } from 'react-hook-form';
import { Form } from 'src/components/form';
import { ITheme } from 'src/dal/themes/interface';
import { IBlock } from 'src/dal/blocks/interfaces';

import { FormInputs, RawData } from './interfaces';
import { useMapStoreToProps } from './selectors';
import { AddSectionContent } from './style';
import { SectionFields } from './fields';

interface IProps {
  onClose(): void;
  selectedTheme: ITheme | null;
  onCreate(data?: any): void;
  onUpdate(sectionId: any, blocks?: any[], commonData?: any): void;
  section: IBlock<any> | null;
}

export const SectionModal = observer((props: IProps) => {
  const { onClose, onCreate, onUpdate, section, selectedTheme } = props;
  const { deleteBlockAction } = useMapStoreToProps();
  // todo хук useForm создает форму и возвращает методы и состояние формы
  // todo все поля зарегистрированные в форме управляются этой формой
  // todo поле можно зарегистрировать (например) при помощи обертки <ControlledField> и "methods.control"
  const methods = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { formState, setError, handleSubmit } = methods;
  const { isValid } = formState;

  const submit = (formInputs: FormInputs) => {
    try {
      const rawData: RawData = { ...formInputs };
      // если ID не шаблонный, значит секция уже создана и ее нужно обновить
      if ((section?.id as number) > -1) {
        const blockIds = section?.data?.blocks?.map((block: IBlock<any>) => block.id);
        onUpdate(section?.id, blockIds, rawData);
      } else {
        // если ID шаблонный - значит секции еще нет, и ее надо создать
        onCreate(rawData);
      }
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
        deleteBlockAction(section?.id as number);
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
              formDefaultValues={section?.data}
              section={section}
            />
          </AddSectionContent>
        </FormProvider>
      </Form>
    </Modal>
  );
});
