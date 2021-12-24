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
  const backgroundImage = rawData.formInputs.backgroundImage?.id;

  return {
    id: rawData.id,
    backgroundType,
    backgroundColor: rawData.formInputs.backgroundColor,
    backgroundGradient: rawData.formInputs.backgroundGradient,
    backgroundImage,
    backgroundRepeat: rawData.formInputs.backgroundRepeat,
    backgroundSmooth: rawData.formInputs.backgroundSmooth,
    color: rawData.formInputs.color,
    headerColor: rawData.formInputs.headerColor,
  };
};

// подгтавливаем данные пришедшие с бэка для формы
export const prepareDataToForm = (theme: ITheme | null): FormInputs => {
  const backgroundType =
    theme?.backgroundType === 'gradient' ? backgroundTypeGradient : backgroundTypeColor;

  return {
    backgroundType,
    backgroundColor: theme?.backgroundColor || '#FFFFFF',
    backgroundGradient: theme?.backgroundGradient || 'linear-gradient(to bottom, #0000FF, #FF0000)',
    backgroundImage: theme?.backgroundImage,
    backgroundRepeat: theme?.backgroundRepeat,
    backgroundSmooth: theme?.backgroundSmooth,
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
