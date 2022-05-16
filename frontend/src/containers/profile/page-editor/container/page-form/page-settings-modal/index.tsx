import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Modal, { MobileSize, DesktopSize } from 'src/components/modal';
import { useForm, FormProvider } from 'react-hook-form';
import { IPage } from 'src/dal/pages/interfaces';
import { Tabs, TabContainer, useTabs } from 'src/components/tabs';
import { Form } from 'src/components/form';

import { TabValue, FormInputs } from './interfaces';
import { LinkFields } from './fields/link';
import { SEOFields } from './fields/seo';
import { pageTabs, getActions } from './utils';
import { useMapStoreToProps } from './selectors';
import { useDefaultValues, useValidateUsername, useSubmit } from './hooks';

interface IProps {
  onClose(): void;
  onSuccess(pageSlug?: string): void;
  activeTabValue: TabValue;
  pageData: IPage;
}

export { TabValue } from './interfaces';

export const PageSettingsModal = observer((props: IProps) => {
  const { activeTabValue: initActiveTabValue, onClose, onSuccess, pageData } = props;
  const [tabs, activeTab, onChangeTab] = useTabs(pageTabs, initActiveTabValue);
  const { myPages, deletePageAction, user, pagesCount } = useMapStoreToProps();
  const defaultValues = useDefaultValues(pageData, user);
  // todo хук useForm создает форму и возвращает методы и состояние формы
  // todo все поля зарегистрированные в форме управляются этой формой
  // todo поле можно зарегистрировать (например) при помощи обертки <ControlledField> и "methods.control"
  const methods = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });
  const { formState, setError, handleSubmit, watch } = methods;
  const { isValid, isDirty } = formState;
  const username = watch('username');
  const usernameErrors = useValidateUsername(isDirty, user, username);
  const [submit, isLoading, dataPage, errors] = useSubmit(user, pageData);

  // форма успешно (без ошибок) отправлена
  useEffect(() => {
    if (!isLoading && formState.isSubmitSuccessful && !errors && dataPage) {
      onSuccess(dataPage?.slug);
      onClose(); // При УСПЕШНОЙ отправке формы закрываем ее
    }
  }, [formState, errors, dataPage, isLoading]);

  // заполнение формы ошибками валидации пришедшими с бэка
  useEffect(() => {
    if (errors || usernameErrors) {
      const combineErrors = errors || usernameErrors;
      const fieldNames = Object.keys(combineErrors);
      fieldNames.forEach((fieldName: any) =>
        setError(fieldName, {
          type: 'server',
          message: combineErrors[fieldName][0],
        })
      );
    }
  }, [errors, usernameErrors, setError]);

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
        deletePageAction(pageData.id);
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
      <Tabs tabs={tabs} activeTab={activeTab} onChangeTab={onChangeTab} />
      <Form onAction={onAction} actions={getActions(myPages)} isValid={isValid}>
        <FormProvider {...methods}>
          <TabContainer value={TabValue.LINK} activeTabValue={activeTab.value}>
            <LinkFields
              formDefaultValues={defaultValues}
              pageData={pageData}
              user={user}
              pagesCount={pagesCount}
            />
          </TabContainer>
          <TabContainer value={TabValue.QR} activeTabValue={activeTab.value}>
            QR code tab content
          </TabContainer>
          <TabContainer value={TabValue.SEO} activeTabValue={activeTab.value}>
            <SEOFields formDefaultValues={defaultValues} pageData={pageData} />
          </TabContainer>
        </FormProvider>
      </Form>
    </Modal>
  );
});
