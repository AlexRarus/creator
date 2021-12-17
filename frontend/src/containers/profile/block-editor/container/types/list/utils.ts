import { IBlock } from 'src/dal/blocks/interfaces';
import { IListDataWrite, IListData, IListItemWrite } from 'src/dal/blocks/data-interfaces';
import { ITab } from 'src/components/tabs';
import { IOption } from 'src/components/select';

import { DataForServer } from '../../interfaces';

import { FormInputs, RawData } from './interfaces';

export const fontSizeOptions: IOption[] = [
  {
    value: 's',
    label: 'Small',
  },
  {
    value: 'm',
    label: 'Medium',
  },
  {
    value: 'l',
    label: 'Large',
  },
];

export const templateOptions: IOption[] = [
  {
    value: 'left',
    label: 'Иконка слева',
  },
  {
    value: 'top',
    label: 'Иконка сверху',
  },
  {
    value: 'right',
    label: 'Иконка справа',
  },
];

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer<IListDataWrite> => ({
  data: {
    iconSize: rawData.formInputs.iconSize,
    fontSize: rawData.formInputs.fontSize?.value,
    template: rawData.formInputs.template?.value,
    items: rawData?.formInputs?.items?.map((item: IListItemWrite) => ({
      title: item?.title as string,
      description: item?.description as string,
      icon: item?.icon,
    })) as IListItemWrite[],
  },
  page_slug: rawData.pageSlug, // меняем поле для отправки на бэк
  type: rawData.blockType, // меняем поле для отправки на бэк
  id: rawData.blockId as any, // id может не быть поэтому any
  index: rawData.index as any, // id может не быть поэтому any
});

export const prepareDataToFormValues = (block: IBlock<IListData> | null): FormInputs => ({
  iconSize: block?.data?.iconSize || '30',
  fontSize:
    fontSizeOptions.find((option: IOption) => option.value === block?.data?.fontSize) ||
    fontSizeOptions[1],
  template:
    templateOptions.find((option: IOption) => option.value === block?.data?.template) ||
    templateOptions[0],
  items: block?.data?.items || [{ id: Math.random(), title: '', description: '' }],
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
