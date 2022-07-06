import { ITemplate } from 'src/dal/templates/interfaces';

import { FormInputs, RawData, DataForServer } from './interfaces';

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData, templateType: string): DataForServer => ({
  ...rawData,
  id: rawData.id as any, // id может не быть поэтому any
  type: templateType,
});

export const prepareDataToFormValues = (template: ITemplate | null): FormInputs => ({
  label: template?.label,
});
