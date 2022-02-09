import { ITheme } from 'src/dal/themes/interfaces';
import { IAction } from 'src/components/form';
import { IOption } from 'src/components/select';

import { FormInputs, RawData, DataForServer } from './interfaces';

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

const animationSizeWidth: IOption = {
  value: 'width',
  label: 'Выравнивание по ширине',
};
const animationSizeHeight: IOption = {
  value: 'height',
  label: 'Выравнивание по высоте',
};
const animationSizeCustom: IOption = {
  value: 'custom',
  label: 'Свой размер',
};
export const animationSizes: IOption[] = [
  animationSizeWidth,
  animationSizeHeight,
  animationSizeCustom,
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
const animationPositionTop: IOption = {
  value: 'top',
  label: 'Сверху страницы',
};
const animationPositionBottom: IOption = {
  value: 'bottom',
  label: 'Снизу страницы',
};
export const animationPositions: IOption[] = [animationPositionTop, animationPositionBottom];
const preserveAspectRatioAlignXMin: IOption = {
  value: 'Min',
  label: 'Слева',
};
const preserveAspectRatioAlignXMid: IOption = {
  value: 'Mid',
  label: 'По середине',
};
const preserveAspectRatioAlignXMax: IOption = {
  value: 'Max',
  label: 'Справа',
};
export const animationPreserveAspectRatioXOptions: IOption[] = [
  preserveAspectRatioAlignXMin,
  preserveAspectRatioAlignXMid,
  preserveAspectRatioAlignXMax,
];
const preserveAspectRatioAlignYMin: IOption = {
  value: 'Min',
  label: 'Сверху',
};
const preserveAspectRatioAlignYMid: IOption = {
  value: 'Mid',
  label: 'По середине',
};
const preserveAspectRatioAlignYMax: IOption = {
  value: 'Max',
  label: 'Снизу',
};
export const animationPreserveAspectRatioYOptions: IOption[] = [
  preserveAspectRatioAlignYMin,
  preserveAspectRatioAlignYMid,
  preserveAspectRatioAlignYMax,
];
const preserveAspectRatioScaleMeet: IOption = {
  value: 'meet',
  label: 'Вписать полностью',
};
const preserveAspectRatioScaleSlice: IOption = {
  value: 'slice',
  label: 'Обрезать',
};
export const animationPreserveAspectRatioScaleOptions: IOption[] = [
  preserveAspectRatioScaleMeet,
  preserveAspectRatioScaleSlice,
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

// подготавливаем данные пришедшие с формы для бэка
export const prepareDataForServer = (rawData: RawData): DataForServer => {
  const backgroundType = rawData.formInputs.backgroundType.value;
  const backgroundImage = rawData.formInputs.backgroundImage?.id || null;

  const backgroundSize = rawData.formInputs.backgroundSize?.value;
  const backgroundSizeCustomValue = `${rawData.formInputs.backgroundSizeCustomValue}%`;

  const backgroundPosition = rawData.formInputs.backgroundPosition?.value;

  const backgroundRepeat = rawData.formInputs.backgroundRepeat?.value;

  const animationPosition = rawData.formInputs.animationPosition?.value;
  const animationSize = rawData.formInputs.animationSize?.value;
  const animationSizeCustomValue = `${rawData.formInputs.animationSizeCustomValue}px`;
  const animationPreserveAspectRatioX = rawData.formInputs.animationPreserveAspectRatioX?.value;
  const animationPreserveAspectRatioY = rawData.formInputs.animationPreserveAspectRatioY?.value;
  const animationPreserveAspectRatioScale =
    rawData.formInputs.animationPreserveAspectRatioScale?.value;

  return {
    id: rawData.id,
    backgroundType,
    backgroundColor: rawData.formInputs.backgroundColor,
    backgroundGradient: rawData.formInputs.backgroundGradient,
    backgroundImage,
    backgroundRepeat,
    backgroundSmooth: rawData.formInputs.backgroundSmooth,
    backgroundSize: backgroundSize === 'custom' ? backgroundSizeCustomValue : backgroundSize,
    backgroundPosition,

    animation:
      typeof rawData.formInputs.animation === 'string' ? undefined : rawData.formInputs.animation,
    animationPosition,
    animationSize: animationSize === 'custom' ? animationSizeCustomValue : animationSize,
    animationPreserveAspectRatioX,
    animationPreserveAspectRatioY,
    animationPreserveAspectRatioScale,

    color: rawData.formInputs.color,
    headerColor: rawData.formInputs.headerColor,
    themeType: rawData.themeType,
  };
};

// подготавливаем данные пришедшие с бэка для формы
export const prepareDataToForm = (theme: ITheme | null): FormInputs => {
  const backgroundType =
    theme?.backgroundType === 'gradient' ? backgroundTypeGradient : backgroundTypeColor;

  const backgroundSize =
    backgroundSizes.find((size: IOption) => size.value === theme?.backgroundSize) ||
    backgroundSizeCustom;
  const parsedBackgroundSizeCustomValue = parseFloat(theme?.backgroundSize as any) || 50;
  const backgroundSizeCustomValue = `${parsedBackgroundSizeCustomValue}`;

  const backgroundPosition =
    backgroundPositions.find((position: IOption) => position.value === theme?.backgroundPosition) ||
    backgroundPositionTop;

  const backgroundRepeat =
    backgroundRepeats.find((repeat: IOption) => repeat.value === theme?.backgroundRepeat) ||
    backgroundRepeatNo;

  const animationPosition =
    animationPositions.find((position: IOption) => position.value === theme?.animationPosition) ||
    animationPositionTop;
  const animationSize =
    animationSizes.find((size: IOption) => size.value === theme?.animationSize) ||
    animationSizeWidth;
  const parsedAnimationSizeCustomValue = parseFloat(theme?.animationSize as any) || 100;
  const animationSizeCustomValue = `${parsedAnimationSizeCustomValue}`;

  const animationPreserveAspectRatioX =
    animationPreserveAspectRatioXOptions.find(
      (item: IOption) => item.value === theme?.animationPreserveAspectRatioX
    ) || preserveAspectRatioAlignXMin;
  const animationPreserveAspectRatioY =
    animationPreserveAspectRatioYOptions.find(
      (item: IOption) => item.value === theme?.animationPreserveAspectRatioY
    ) || preserveAspectRatioAlignYMin;
  const animationPreserveAspectRatioScale =
    animationPreserveAspectRatioScaleOptions.find(
      (item: IOption) => item.value === theme?.animationPreserveAspectRatioScale
    ) || preserveAspectRatioScaleSlice;

  return {
    backgroundType,
    backgroundColor: theme?.backgroundColor || '#FFFFFF',
    backgroundGradient: theme?.backgroundGradient || 'linear-gradient(to bottom, #0000FF, #FF0000)',
    backgroundImage: theme?.backgroundImage,
    backgroundRepeat,
    backgroundSmooth: theme?.backgroundSmooth,
    backgroundSize,
    backgroundSizeCustomValue,
    backgroundPosition,

    animation: theme?.animation, // тут пришла строка (путь для скачивания файла)
    animationPosition,
    animationSize,
    animationSizeCustomValue,
    animationPreserveAspectRatioX,
    animationPreserveAspectRatioY,
    animationPreserveAspectRatioScale,

    color: theme?.color || '#263238',
    headerColor: theme?.headerColor || '#000000',
  };
};

export const getActions = (isAuthor: boolean, isEditing: boolean): IAction[] => {
  const actions: IAction[] = [];

  if (isAuthor) {
    actions.push({
      id: 'delete',
      label: 'Удалить',
      kind: 'delete',
      needConfirm: true,
    });
  }

  if (isEditing) {
    actions.push({
      id: 'clone',
      label: 'Клонировать',
    });
  }

  return actions;
};
