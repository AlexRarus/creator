import { IBlock } from 'src/dal/blocks/interfaces';
import { ITab } from 'src/components/tabs';
import { IAction } from 'src/components/form';
import { IOption } from 'src/components/select';
import { ISectionData, ISectionDataWrite } from 'src/dal/blocks/section-interfaces';

import { DataForServer } from '../../interfaces';

import { FormInputs, RawData } from './interfaces';

const backgroundTypeColor: IOption = {
  value: 'color',
  label: 'Сплошной цвет',
};
const backgroundTypeGradient: IOption = {
  value: 'gradient',
  label: 'Градиент',
};
export const backgroundTypes: IOption[] = [backgroundTypeColor, backgroundTypeGradient];

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer<ISectionDataWrite> => {
  const backgroundType = rawData.formInputs.backgroundType?.value;
  const backgroundImage = rawData.formInputs.backgroundImage?.id;

  return {
    data: {
      label: rawData?.formInputs?.label,
      blocks: rawData.blocks,
      backgroundType,
      backgroundColor: rawData.formInputs.backgroundColor,
      backgroundGradient: rawData.formInputs.backgroundGradient,
      backgroundImage,
      backgroundRepeat: rawData.formInputs.backgroundRepeat,
      backgroundSmooth: rawData.formInputs.backgroundSmooth,
      backgroundParallax: rawData.formInputs.backgroundParallax,
      color: rawData.formInputs.color,
      borderRadius: rawData.formInputs.borderRadius,
      paddingTop: rawData.formInputs.paddingTop,
      paddingBottom: rawData.formInputs.paddingBottom,
      paddingRight: rawData.formInputs.paddingRight,
      paddingLeft: rawData.formInputs.paddingLeft,
    },
    page_slug: rawData.pageSlug, // меняем поле для отправки на бэк
    type: rawData.blockType, // меняем поле для отправки на бэк
    id: rawData.blockId as any, // id может не быть поэтому any
    index: rawData.index as any, // index может не быть поэтому any
  };
};

// предзаполняем форму этими данными
export const prepareDataToFormValues = (block: IBlock<ISectionData> | null): FormInputs => {
  const backgroundType =
    block?.data?.backgroundType === 'gradient' ? backgroundTypeGradient : backgroundTypeColor;

  return {
    label: block?.data?.label || 'новая секция',
    backgroundType,
    backgroundColor: block?.data?.backgroundColor || '#FFFFFF',
    backgroundGradient:
      block?.data?.backgroundGradient || 'linear-gradient(to bottom, #0000FF, #FF0000)',
    backgroundImage: block?.data?.backgroundImage,
    backgroundRepeat: block?.data?.backgroundRepeat,
    backgroundSmooth: block?.data?.backgroundSmooth,
    backgroundParallax: block?.data?.backgroundParallax,
    color: block?.data?.color,
    paddingTop: block?.data?.paddingTop || '20',
    paddingBottom: block?.data?.paddingBottom || '20',
    paddingRight: block?.data?.paddingRight || '10',
    paddingLeft: block?.data?.paddingLeft || '10',
    borderRadius: block?.data?.borderRadius || '0',
  };
};

export enum TabValue {
  section = 'section',
  preview = 'preview',
  settings = 'settings',
}

export const blockTabs: ITab<TabValue>[] = [
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
