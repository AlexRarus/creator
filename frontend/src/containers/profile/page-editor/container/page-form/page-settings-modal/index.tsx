import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Modal, { MobileSize, DesktopSize } from 'src/components/modal';
import { useForm, FormProvider } from 'react-hook-form';
import { useSubmitUsernameForm } from 'src/api/hooks/submit-forms/auth/useSubmitUsernameForm';
import { useSubmitUserIndexPageForm } from 'src/api/hooks/submit-forms/auth/useSubmitUserIndexPageForm';
import { useSubmitPageForm } from 'src/api/hooks/submit-forms/page/useSubmitPageForm';
import { IPage } from 'src/dal/pages/interfaces';
import { Tabs, TabContainer, useTabs } from 'src/components/tabs';
import { Form } from 'src/components/form';

import { TabValue, FormInputs, RawData } from './interfaces';
import { LinkFields } from './fields/link';
import { SEOFields } from './fields/seo';
import {
  prepareDataForUsernameUpdate,
  prepareDataForUserIndexPageUpdate,
  prepareDataForPageUpdate,
  pageTabs,
  getActions,
} from './utils';
import { useMapStoreToProps } from './selectors';
import { useDefaultValues } from './hooks';

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
  const { myPages, deletePageAction, user } = useMapStoreToProps();
  const defaultValues = useDefaultValues(pageData, user);
  // todo хук useForm создает форму и возвращает методы и состояние формы
  // todo все поля зарегистрированные в форме управляются этой формой
  // todo поле можно зарегистрировать (например) при помощи обертки <ControlledField> и "methods.control"
  const methods = useForm<FormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });
  const { formState, setError, handleSubmit } = methods;
  const { isValid } = formState;
  const [
    submitUsernameForm,
    isLoadingUsername,
    dataUsername,
    errorsUsername,
  ] = useSubmitUsernameForm<{ username?: string }>();
  const [
    submitUserPageSlugForm,
    isLoadingUserPageSlug,
    dataUserPageSlug,
    errorsUserPageSlug,
  ] = useSubmitUserIndexPageForm<{ index_page_slug?: string }>();
  const [submitPageForm, isLoadingPage, dataPage, errorsPage] = useSubmitPageForm<FormInputs>(true);

  const submit = async (formInputs: FormInputs) => {
    // todo по сути с этой модалки может уйти до трех запросов (сделано дл удобства пользователей) чтобы не приходилось бегать между формами
    // 1) обновление username
    // 2) обновление указателя на главную страницу
    // 3) обновление данных самой страницы
    const rawData: RawData = { id: pageData.id, ...formInputs };
    const usernameDataUpdate = prepareDataForUsernameUpdate(rawData, user);
    const usernameIndexPageDataUpdate = prepareDataForUserIndexPageUpdate(rawData, user, pageData);
    const pageDataUpdate = prepareDataForPageUpdate(rawData);

    if (usernameDataUpdate) {
      // 1) обновление username
      await submitUsernameForm(usernameDataUpdate);
    }
    if (usernameIndexPageDataUpdate) {
      // 2) обновление указателя на главную страницу
      await submitUserPageSlugForm(usernameIndexPageDataUpdate);
    }
    if (pageDataUpdate) {
      // 3) обновление данных самой страницы
      await submitPageForm(pageDataUpdate);
    }
  };

  // форма успешно (без ошибок) отправлена
  useEffect(() => {
    const isLoading = isLoadingPage || isLoadingUserPageSlug || isLoadingUsername;
    const errors = errorsPage || errorsUserPageSlug || errorsUsername;
    if (!isLoading && formState.isSubmitSuccessful && !errors && dataPage) {
      onSuccess(dataPage?.slug);
      onClose(); // При УСПЕШНОЙ отправке формы закрываем ее
    }
  }, [
    formState,
    errorsPage,
    errorsUserPageSlug,
    errorsUsername,
    dataPage,
    dataUserPageSlug,
    dataUsername,
    isLoadingPage,
    isLoadingUserPageSlug,
    isLoadingUsername,
  ]);

  // заполнение формы ошибками валидации пришедшими с бэка
  useEffect(() => {
    if (errorsPage || errorsUserPageSlug || errorsUsername) {
      const errors = {
        ...errorsPage,
        ...errorsUserPageSlug,
        ...errorsUsername,
      };
      const fieldNames = Object.keys(errors);
      fieldNames.forEach((fieldName: any) =>
        setError(fieldName, {
          type: 'server',
          message: errors[fieldName][0],
        })
      );
    }
  }, [errorsPage, errorsUserPageSlug, errorsUsername, setError]);

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
            <LinkFields formDefaultValues={defaultValues} pageData={pageData} user={user} />
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
