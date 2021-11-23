import { IPage } from 'src/dal/pages/interfaces';

import { FormInputs, RawData, DataForServer } from './interfaces';

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer => ({
  ...rawData,
  id: rawData.id as any, // id может не быть поэтому any
});

export const prepareDataToFormValues = (page: IPage | null): FormInputs => ({
  label: page?.label,
});
