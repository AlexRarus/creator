import { IBlock } from 'src/dal/blocks/interfaces';
import { ITab } from 'src/components/tabs';
import { COLORS } from 'src/components/theme';
import { IAction } from 'src/components/form';

import { DataForServer } from '../../interfaces';

import { FormInputs, RawData, DataToServer } from './interfaces';

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer<DataToServer> => ({
  data: {
    ...rawData.formInputs,
    blocks: rawData.blocks,
  },
  page_slug: rawData.pageSlug, // меняем поле для отправки на бэк
  type: rawData.blockType, // меняем поле для отправки на бэк
  id: rawData.blockId as any, // id может не быть поэтому any
  index: rawData.index as any, // index может не быть поэтому any
});

// предзаполняем форму этими данными
export const prepareDataToFormValues = (block: IBlock<FormInputs> | null): FormInputs => ({
  label: block?.data?.label || 'новая секция',
  paddingTop: block?.data?.paddingTop || '20',
  paddingBottom: block?.data?.paddingBottom || '20',
  paddingRight: block?.data?.paddingRight || '10',
  paddingLeft: block?.data?.paddingLeft || '10',
  background: block?.data?.background || COLORS.deepPurple.A400,
  borderRadius: block?.data?.borderRadius || '0',
});

export enum TabValue {
  section = 'section',
  preview = 'preview',
  settings = 'settings',
}

export const blockTabs: ITab[] = [
  {
    value: TabValue.section,
    label: 'Секция',
  },
  {
    value: TabValue.preview,
    label: 'Предпросмотр',
  },
  {
    value: TabValue.settings,
    label: 'Настройки',
  },
];

export const blockActions: IAction[] = [
  {
    id: 'delete',
    label: 'Удалить',
    kind: 'delete',
    needConfirm: true,
  },
];
