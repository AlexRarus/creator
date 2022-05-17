import { useEffect, useState } from 'react';
import { IPage } from 'src/dal/pages/interfaces';
import { IUser } from 'src/dal/auth/interfaces';
import { useValidateUsernameForm } from 'src/api/hooks/validate-forms/auth/useValidateUsernameForm';
import { useSubmitUsernameForm } from 'src/api/hooks/submit-forms/auth/useSubmitUsernameForm';
import { useSubmitUserIndexPageForm } from 'src/api/hooks/submit-forms/auth/useSubmitUserIndexPageForm';
import { useSubmitPageForm } from 'src/api/hooks/submit-forms/page/useSubmitPageForm';

import { FormInputs, RawData } from './interfaces';
import {
  prepareDataForPageUpdate,
  prepareDataForUserIndexPageUpdate,
  prepareDataForUsernameUpdate,
} from './utils';

export const useDefaultValues = (pageData: IPage, user: IUser | null) => {
  return {
    isIndex: pageData.id === user?.index_page?.id,
    slug: pageData.slug,
    title: '',
    username: user?.username || '',
  };
};

export const useValidateUsername = (isDirty: boolean, user: IUser | null, username?: string) => {
  const [
    validateUsername,
    isLoadingValidate,
    dataValidate,
    errorsValidateUsername,
  ] = useValidateUsernameForm<{ username: string }>();

  useEffect(() => {
    if (isDirty && username && username !== user?.username) {
      // валидируем на доступность введенного username
      validateUsername({ username });
    }
  }, [username]);

  return errorsValidateUsername;
};

export const useSubmit = (user: IUser | null, page: IPage) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);

  useEffect(() => {
    setIsLoading(isLoadingUsername || isLoadingUserPageSlug || isLoadingPage);
  }, [isLoadingUsername, isLoadingUserPageSlug, isLoadingPage]);
  useEffect(() => {
    const preparedErrorsUsername = errorsUsername || {};
    const preparedErrorsUserPageSlug = errorsUserPageSlug || {};
    const preparedErrorsPage = errorsPage || {};

    if (errorsUsername || errorsUserPageSlug || errorsPage) {
      setErrors({
        ...preparedErrorsUsername,
        ...preparedErrorsUserPageSlug,
        ...preparedErrorsPage,
      });
    } else {
      setErrors(null);
    }
  }, [errorsUsername, errorsUserPageSlug, errorsPage]);

  const submit = async (formInputs: FormInputs) => {
    // todo по сути с этой модалки может уйти до трех запросов (сделано дл удобства пользователей) чтобы не приходилось бегать между формами
    // 1) обновление username
    // 2) обновление указателя на главную страницу
    // 3) обновление данных самой страницы
    const rawData: RawData = { id: page.id, ...formInputs };
    const usernameDataUpdate = prepareDataForUsernameUpdate(rawData, user);
    const usernameIndexPageDataUpdate = prepareDataForUserIndexPageUpdate(rawData, user, page);
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

  return [submit, isLoading, dataPage, errors];
};
