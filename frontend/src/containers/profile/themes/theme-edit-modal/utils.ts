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
export const prepareDataForServer = (rawData: RawData): DataForServer => ({
  id: rawData.id,
  background: rawData.formInputs.backgroundColor,
  color: rawData.formInputs.color,
});

// подгтавливаем данные пришедшие с бэка для формы
export const prepareDataToForm = (theme: ITheme | null): FormInputs => ({
  backgroundType: theme?.background.includes('gradient')
    ? backgroundTypeGradient
    : backgroundTypeColor,
  backgroundColor: theme?.background || 'red',
  backgroundGradient: theme?.background || 'white',
  color: theme?.color || 'black',
});

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
