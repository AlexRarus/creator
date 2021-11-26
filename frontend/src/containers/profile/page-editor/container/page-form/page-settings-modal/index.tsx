import React, { useEffect } from 'react';
import Modal, { MobileSize, DesktopSize } from 'src/components/modal';
import { useForm, FormProvider } from 'react-hook-form';
import { useSubmitPageForm } from 'src/api/hooks/submit-forms/page/useSubmitPageForm';
import { IPage } from 'src/dal/pages/interfaces';
import { Tabs, TabContainer, useTabs } from 'src/components/tabs';
import { Form } from 'src/components/form';

import { TabValue, FormInputs, RawData } from './interfaces';
import { LinkFields } from './fields/link';
import { SEOFields } from './fields/seo';
import { prepareDataForServer, pageTabs, pageActions } from './utils';

interface IProps {
  onClose(): void;
  onSuccess(slug?: string): void;
  activeTabValue: TabValue;
  pageData: IPage;
}

export { TabValue } from './interfaces';

export const PageSettingsModal = (props: IProps) => {
  const { activeTabValue: initActiveTabValue, onClose, onSuccess, pageData } = props;
  const [tabs, activeTab, onChangeTab] = useTabs(pageTabs, initActiveTabValue);
  // todo хук useForm создает форму и возвращает методы и состояние формы
  // todo все поля зарегистрированные в форме управляются этой формой
  // todo поле можно зарегистрировать (например) при помощи обертки <ControlledField> и "methods.control"
  const methods = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { formState, setError, handleSubmit } = methods;
  const { isValid } = formState;
  const [submitPageForm, isLoading, data, errors] = useSubmitPageForm<FormInputs>(true);

  const submit = async (formInputs: FormInputs) => {
    const rawData: RawData = { id: pageData.id, ...formInputs };

    await submitPageForm(prepareDataForServer(rawData));
  };

  // форма успешно (без ошибок) отправлена
  useEffect(() => {
    if (!isLoading && formState.isSubmitSuccessful && !errors && data) {
      onSuccess(data?.slug);
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
        break;
      case 'cancel':
        onClose();
        break;
      case 'remove':
        console.log('remove page');
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
      <Tabs tabs={tabs} activeTab={activeTab} onChangeTab={onChangeTab} />
      <Form onAction={onAction} actions={pageActions} isValid={isValid}>
        <FormProvider {...methods}>
          <TabContainer value={TabValue.LINK} activeTabValue={activeTab.value}>
            <LinkFields formDefaultValues={pageData} />
          </TabContainer>
          <TabContainer value={TabValue.QR} activeTabValue={activeTab.value}>
            QR code tab content
          </TabContainer>
          <TabContainer value={TabValue.SEO} activeTabValue={activeTab.value}>
            <SEOFields formDefaultValues={pageData} />
          </TabContainer>
        </FormProvider>
      </Form>
    </Modal>
  );
};
