import { ITemplate } from 'src/dal/templates/interfaces';
import type { IWriteTemplate as DataForServer } from 'src/api/endpoints/templates';
import { ITab } from 'src/components/tabs';
import { IAction } from 'src/components/form';

import { FormInputs, RawData, TabValue } from './interfaces';

export const templateTabs: ITab<TabValue>[] = [
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

export const getActions = (templates: ITemplate[]): IAction[] => [
  {
    id: 'delete',
    label: 'Удалить',
    kind: 'delete',
    disabled: templates?.length === 1,
    needConfirm: true,
  },
];

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData, themeType: string): DataForServer => ({
  ...rawData,
  id: rawData.id as any, // id может не быть поэтому any
  type: themeType,
});

export const prepareDataToFormValues = (template: ITemplate | null): FormInputs => ({
  slug: template?.slug,
  // title: template?.title, // todo поля title еще нет в моделе на бэке
});
