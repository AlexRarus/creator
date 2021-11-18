import { IBlock } from 'src/dal/blocks/interfaces';

import { DataForServer } from '../../interfaces';

import { FormInputs, RawData } from './interfaces';

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer<FormInputs> => ({
  data: rawData.data,
  page_slug: rawData.pageSlug, // меняем поле для отправки на бэк
  type: rawData.blockType, // меняем поле для отправки на бэк
  id: rawData.blockId as any, // id может не быть поэтому any
});

export const prepareDataToFormValues = (block: IBlock<FormInputs> | null): FormInputs => ({
  text: block?.data?.text,
});
