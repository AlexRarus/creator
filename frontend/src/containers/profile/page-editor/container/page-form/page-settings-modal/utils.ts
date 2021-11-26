import { IPage } from 'src/dal/pages/interfaces';
import type { IWritePage as DataForServer } from 'src/api/endpoints/pages';

import { FormInputs, RawData } from './interfaces';

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer => ({
  ...rawData,
  id: rawData.id as any, // id может не быть поэтому any
});

export const prepareDataToFormValues = (page: IPage | null): FormInputs => ({
  slug: page?.slug,
  // title: page?.title, // todo поля title еще нет в моделе на бэке
});
