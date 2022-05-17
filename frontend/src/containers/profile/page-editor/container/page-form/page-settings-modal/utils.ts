import { IPage } from 'src/dal/pages/interfaces';
import { IUser } from 'src/dal/auth/interfaces';
import type { IWritePage } from 'src/api/endpoints/pages';
import type { IUpdateUsername, IUpdateUserIndexPage } from 'src/api/endpoints/auth';
import { ITab } from 'src/components/tabs';
import { IAction } from 'src/components/form';

import { FormInputs, RawData, TabValue } from './interfaces';

export const pageTabs: ITab<TabValue>[] = [
  {
    value: TabValue.LINK,
    label: 'Ссылка',
  },
  {
    value: TabValue.QR,
    label: 'QR код',
  },
  {
    value: TabValue.SEO,
    label: 'СЕО',
  },
];

export const getActions = (pages: IPage[], activeTab: ITab<TabValue>): IAction[] => {
  if (activeTab.value === TabValue.QR) {
    return [
      {
        id: 'download-qr-code',
        label: 'Скачать QR',
        kind: 'primary',
      },
    ];
  }

  return [
    {
      id: 'delete',
      label: 'Удалить',
      kind: 'delete',
      disabled: pages?.length === 1,
      needConfirm: true,
    },
  ];
};

export const prepareDataForUsernameUpdate = (
  rawData: RawData,
  user: IUser | null
): IUpdateUsername | null => {
  // если username текущего пользователя отличается от введенного в форму - пытаемся его изменить на бэке
  if (user?.username !== rawData.username) {
    return {
      username: rawData.username as string,
    };
  }
  return null;
};

export const prepareDataForUserIndexPageUpdate = (
  rawData: RawData,
  user: IUser | null,
  page: IPage
): IUpdateUserIndexPage | null => {
  // если в форме установлен флаг isIndex и slug страницы отличается от того что указан у пользователя
  if (rawData.isIndex && user?.index_page?.id !== page.id) {
    return {
      index_page: page.id,
    };
  } else if (!rawData.isIndex && user?.index_page?.id === page.id) {
    return {
      index_page: null,
    };
  }
  return null;
};

// преобразовываем типы и меняем поля если надо
export const prepareDataForPageUpdate = (rawData: RawData): IWritePage => ({
  id: rawData.id as any, // id может не быть поэтому any
  slug: rawData.slug,
  title: rawData.title,
  description: rawData.description,
});

export const prepareDataToFormValues = (page: IPage | null): FormInputs => ({
  slug: page?.slug,
  // title: page?.title, // todo поля title еще нет в моделе на бэке
});
