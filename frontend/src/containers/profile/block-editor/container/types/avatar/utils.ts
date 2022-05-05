import { IBlock } from 'src/dal/blocks/interfaces';
import { ITab } from 'src/components/tabs';

import { DataForServer } from '../../interfaces';

import { FormInputs, RawData } from './interfaces';

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer<FormInputs> => ({
  data: {
    ...rawData.formInputs,
  },
  page_slug: rawData.pageSlug, // меняем поле для отправки на бэк
  template_slug: rawData.templateSlug, // меняем поле для отправки на бэк
  type: rawData.blockType, // меняем поле для отправки на бэк
  id: rawData.blockId as any, // id может не быть поэтому any
  index: rawData.index as any, // id может не быть поэтому any
});

export const prepareDataToFormValues = (block: IBlock<FormInputs> | null): FormInputs => ({
  dimension: block?.data?.dimension || 'm',
});

export enum TabValue {
  editor = 'editor',
  settings = 'settings',
}

export const blockTabs: ITab<TabValue>[] = [
  {
    value: TabValue.editor,
    label: 'Редактирование',
  },
  {
    value: TabValue.settings,
    label: 'Настройки',
  },
];
