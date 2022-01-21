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

const backgroundSizeAuto: IOption = {
  value: 'auto',
  label: 'Автоматически',
};
const backgroundSizeWidth: IOption = {
  value: '100% auto',
  label: 'Выравнивание по ширине',
};
const backgroundSizeHeight: IOption = {
  value: 'auto 100%',
  label: 'Выравнивание по высоте',
};
const backgroundSizeCustom: IOption = {
  value: 'custom',
  label: 'Свой масштаб',
};
export const backgroundSizes: IOption[] = [
  backgroundSizeAuto,
  backgroundSizeWidth,
  backgroundSizeHeight,
  backgroundSizeCustom,
];

const backgroundPositionTop: IOption = {
  value: 'top',
  label: 'Сверху',
};
const backgroundPositionCenter: IOption = {
  value: 'center',
  label: 'По центру',
};
const backgroundPositionBottom: IOption = {
  value: 'bottom',
  label: 'Снизу',
};
const backgroundPositionLeft: IOption = {
  value: 'left',
  label: 'Слева',
};
const backgroundPositionRight: IOption = {
  value: 'right',
  label: 'Справа',
};
export const backgroundPositions: IOption[] = [
  backgroundPositionTop,
  backgroundPositionCenter,
  backgroundPositionBottom,
  backgroundPositionLeft,
  backgroundPositionRight,
];

const backgroundRepeatNo: IOption = {
  value: 'no-repeat',
  label: 'Не зацикливать',
};
const backgroundRepeatX: IOption = {
  value: 'repeat-x',
  label: 'По горизонтали',
};
const backgroundRepeatY: IOption = {
  value: 'repeat-y',
  label: 'По вертикали',
};
const backgroundRepeatBoth: IOption = {
  value: 'repeat',
  label: 'Во всех направлениях',
};
export const backgroundRepeats: IOption[] = [
  backgroundRepeatNo,
  backgroundRepeatX,
  backgroundRepeatY,
  backgroundRepeatBoth,
];

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer<ISectionDataWrite> => {
  const backgroundType = rawData.formInputs.backgroundType?.value;
  const backgroundImage = rawData.formInputs.backgroundImage?.id || null;

  const backgroundSize = rawData.formInputs.backgroundSize?.value;
  const backgroundSizeCustomValue = `${rawData.formInputs.backgroundSizeCustomValue}%`;

  const backgroundPosition = rawData.formInputs.backgroundPosition?.value;

  const backgroundRepeat = rawData.formInputs.backgroundRepeat?.value;

  return {
    data: {
      label: rawData?.formInputs?.label,
      blocks: rawData.blocks,
      backgroundType,
      backgroundColor: rawData.formInputs.backgroundColor,
      backgroundGradient: rawData.formInputs.backgroundGradient,
      backgroundImage,
      backgroundRepeat,
      backgroundSmooth: rawData.formInputs.backgroundSmooth,
      backgroundParallax: rawData.formInputs.backgroundParallax,
      backgroundSize: backgroundSize === 'custom' ? backgroundSizeCustomValue : backgroundSize,
      backgroundPosition,
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

  const backgroundSize =
    backgroundSizes.find((size: IOption) => size.value === block?.data?.backgroundSize) ||
    backgroundSizeCustom;
  const parsedBackgroundSizeCustomValue = parseFloat(block?.data?.backgroundSize as any) || 50;
  const backgroundSizeCustomValue = `${parsedBackgroundSizeCustomValue}`;

  const backgroundPosition =
    backgroundPositions.find(
      (position: IOption) => position.value === block?.data?.backgroundPosition
    ) || backgroundPositionTop;

  const backgroundRepeat =
    backgroundRepeats.find((repeat: IOption) => repeat.value === block?.data?.backgroundRepeat) ||
    backgroundRepeatNo;

  return {
    label: block?.data?.label || 'новая секция',
    backgroundType,
    backgroundColor: block?.data?.backgroundColor || '#FFFFFF',
    backgroundGradient:
      block?.data?.backgroundGradient || 'linear-gradient(to bottom, #0000FF, #FF0000)',
    backgroundImage: block?.data?.backgroundImage,
    backgroundRepeat,
    backgroundSmooth: block?.data?.backgroundSmooth,
    backgroundParallax: block?.data?.backgroundParallax,
    backgroundSize,
    backgroundSizeCustomValue,
    backgroundPosition,
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
