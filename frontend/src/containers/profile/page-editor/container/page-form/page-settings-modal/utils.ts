import { IPage } from 'src/dal/pages/interfaces';
import type { IWritePage as DataForServer } from 'src/api/endpoints/pages';
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

export const getActions = (pages: IPage[]): IAction[] => [
  {
    id: 'delete',
    label: 'Удалить',
    kind: 'delete',
    disabled: pages?.length === 1,
    needConfirm: true,
  },
];

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer => ({
  ...rawData,
  id: rawData.id as any, // id может не быть поэтому any
});

export const prepareDataToFormValues = (page: IPage | null): FormInputs => ({
  slug: page?.slug,
  // title: page?.title, // todo поля title еще нет в моделе на бэке
});
