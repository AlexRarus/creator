import React, { useEffect } from 'react';
import Modal, { MobileSize } from 'src/components/modal';
import { useForm, FormProvider } from 'react-hook-form';
import Button, { ButtonsList } from 'src/components/button';
import { useSubmitPageForm } from 'src/api/hooks/submit-forms/page/useSubmitPageForm';
import { IPage } from 'src/dal/pages/interfaces';

import { TabValue, ITab, FormInputs, RawData } from './interfaces';
import { useTabs } from './hooks';
import {
  PageSettingsWrapper,
  PageSettingsHeader,
  Tabs,
  TabItem,
  PageSettingsContent,
  HideBlock,
} from './styles';
import { LinkFields } from './fields/link';
import { SEOFields } from './fields/seo';
import { prepareDataForServer } from './utils';

interface IProps {
  onClose(): void;
  onSuccess(slug?: string): void;
  activeTabValue: TabValue;
  pageData: IPage;
}

export { TabValue } from './interfaces';

export const PageSettingsModal = (props: IProps) => {
  const { activeTabValue: initActiveTabValue, onClose, onSuccess, pageData } = props;
  const [tabs, activeTab, setActiveTab] = useTabs(initActiveTabValue);
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

  const onSubmit = () => handleSubmit(submit)();

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

  return (
    <Modal
      onClose={onClose}
      mobileSize={MobileSize.L}
      title='Редактирование страницы'
      padding={null}>
      <PageSettingsWrapper>
        <PageSettingsHeader>
          <Tabs>
            {tabs.map((tab: ITab) => (
              <TabItem
                key={tab.value}
                isActive={tab.value === activeTab.value}
                onClick={() => setActiveTab(tab)}>
                {tab.label}
              </TabItem>
            ))}
          </Tabs>
        </PageSettingsHeader>
        <PageSettingsContent>
          <FormProvider {...methods}>
            <HideBlock isShow={activeTab.value === TabValue.LINK}>
              <LinkFields formDefaultValues={pageData} />
            </HideBlock>
            <HideBlock isShow={activeTab.value === TabValue.SEO}>
              <SEOFields formDefaultValues={pageData} />
            </HideBlock>
          </FormProvider>
        </PageSettingsContent>
        <ButtonsList marginTop={20}>
          <Button onClick={onClose}>Действия</Button>
          <Button onClick={onSubmit} disabled={!isValid}>
            Сохранить
          </Button>
        </ButtonsList>
      </PageSettingsWrapper>
    </Modal>
  );
};
