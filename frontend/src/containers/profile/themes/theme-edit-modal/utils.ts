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

// подгтавливаем данные пришедшие с формы для бэка
export const prepareDataForServer = (rawData: RawData): DataForServer => {
  const backgroundType = rawData.formInputs.backgroundType.value;

  return {
    id: rawData.id,
    background:
      backgroundType === 'color'
        ? rawData.formInputs.backgroundColor
        : rawData.formInputs.backgroundGradient,
    color: rawData.formInputs.color,
    headerColor: rawData.formInputs.headerColor,
  };
};

// подгтавливаем данные пришедшие с бэка для формы
export const prepareDataToForm = (theme: ITheme | null): FormInputs => {
  const background = theme?.background || '#FFFFFF';
  const backgroundType = background.includes('linear-gradient')
    ? backgroundTypeGradient
    : backgroundTypeColor;

  return {
    backgroundType,
    backgroundColor: backgroundType.value === 'color' ? background : '#FFFFFF',
    backgroundGradient:
      backgroundType.value === 'gradient'
        ? background
        : 'linear-gradient(to bottom, #0000FF, #FF0000)',
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
