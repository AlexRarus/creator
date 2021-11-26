import { IBlock } from 'src/dal/blocks/interfaces';
import { ITab } from 'src/components/tabs';

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

export enum TabValue {
  text = 'text',
  settings = 'settings',
  section = 'section',
}

export const blockTabs: ITab[] = [
  {
    value: TabValue.text,
    label: 'Текст',
  },
  {
    value: TabValue.settings,
    label: 'Настройки',
  },
  {
    value: TabValue.section,
    label: 'Секция',
  },
];
