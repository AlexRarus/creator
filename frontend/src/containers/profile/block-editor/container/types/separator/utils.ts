import { ITab } from 'src/components/tabs';
import { IAction } from 'src/components/form';

import { DataForServer } from '../../interfaces';

import { RawData, DataToServer } from './interfaces';

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = ({
  formInputs,
  pageSlug,
  templateSlug,
  blockId,
  blockType,
  index,
}: RawData): DataForServer<DataToServer> => ({
  data: {
    isWide: formInputs.isWide,
    isTransparent: formInputs.isTransparent,
    value: formInputs.value,
    kind: formInputs.kind,
    icon: formInputs?.icon?.id, // при прикреплении изображения нужно отправить его id
  },
  page_slug: pageSlug, // меняем поле для отправки на бэк
  template_slug: templateSlug, // меняем поле для отправки на бэк
  type: blockType, // меняем поле для отправки на бэк
  id: blockId as any, // id может не быть поэтому any
  index: index as any, // index может не быть поэтому any
});

export enum TabValue {
  separator = 'separator',
  settings = 'settings',
}

export const blockTabs: ITab<TabValue>[] = [
  {
    value: TabValue.separator,
    label: 'Разделитель',
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

export const getDefaultBlock = (
  kind: string,
  isWide?: boolean,
  isTransparent?: boolean,
  icon?: any
) => ({
  type: 'separator',
  data: {
    isWide,
    isTransparent,
    icon,
    kind,
  },
});
