import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Modal, { MobileSize, DesktopSize } from 'src/components/modal';
import { useForm, FormProvider } from 'react-hook-form';
import { useSubmitTemplateForm } from 'src/api/hooks/submit-forms/template/useSubmitTemplateForm';
import { ITemplate } from 'src/dal/templates/interfaces';
import { Tabs, TabContainer, useTabs } from 'src/components/tabs';
import { Form } from 'src/components/form';

import { TabValue, FormInputs, RawData } from './interfaces';
import { LinkFields } from './fields/link';
import { SEOFields } from './fields/seo';
import { prepareDataForServer, templateTabs, getActions } from './utils';
import { useMapStoreToProps } from './selectors';

interface IProps {
  onClose(): void;
  onSuccess(slug?: string): void;
  activeTabValue: TabValue;
  templateData: ITemplate;
}

export { TabValue } from './interfaces';

export const TemplateSettingsModal = observer((props: IProps) => {
  const { activeTabValue: initActiveTabValue, onClose, onSuccess, templateData } = props;
  const [tabs, activeTab, onChangeTab] = useTabs(templateTabs, initActiveTabValue);
  const { myTemplates, deleteTemplateAction } = useMapStoreToProps();
  // todo хук useForm создает форму и возвращает методы и состояние формы
  // todo все поля зарегистрированные в форме управляются этой формой
  // todo поле можно зарегистрировать (например) при помощи обертки <ControlledField> и "methods.control"
  const methods = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { formState, setError, handleSubmit } = methods;
  const { isValid } = formState;
  const [submitTemplateForm, isLoading, data, errors] = useSubmitTemplateForm<FormInputs>(true);

  const submit = async (formInputs: FormInputs) => {
    const rawData: RawData = { id: templateData.id, ...formInputs };

    await submitTemplateForm(prepareDataForServer(rawData));
  };

  // форма успешно (без ошибок) отправлена
  useEffect(() => {
    if (!isLoading && formState.isSubmitSuccessful && !errors && data) {
      onSuccess(data?.slug);
      onClose(); // При УСПЕШНОЙ отправке формы закрываем ее
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
        onClose();
        break;
      case 'delete':
        deleteTemplateAction(templateData.id);
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
      title='Настройки шаблона'>
      <Tabs tabs={tabs} activeTab={activeTab} onChangeTab={onChangeTab} />
      <Form onAction={onAction} actions={getActions(myTemplates)} isValid={isValid}>
        <FormProvider {...methods}>
          <TabContainer value={TabValue.LINK} activeTabValue={activeTab.value}>
            <LinkFields formDefaultValues={templateData} />
          </TabContainer>
          <TabContainer value={TabValue.QR} activeTabValue={activeTab.value}>
            QR code tab content
          </TabContainer>
          <TabContainer value={TabValue.SEO} activeTabValue={activeTab.value}>
            <SEOFields formDefaultValues={templateData} />
          </TabContainer>
        </FormProvider>
      </Form>
    </Modal>
  );
});
