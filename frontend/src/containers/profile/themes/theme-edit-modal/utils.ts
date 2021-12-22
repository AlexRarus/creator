import { ITheme } from 'src/dal/themes/interfaces';
import { IAction } from 'src/components/form';

import { FormInputs, RawData, DataForServer } from './interfaces';

// подгтавливаем данные пришедшие с формы для бэка
export const prepareDataForServer = (rawData: RawData): DataForServer => ({
  id: rawData.id,
  background: rawData.formInputs.background,
  color: rawData.formInputs.color,
});

// подгтавливаем данные пришедшие с бэка для формы
export const prepareDataToForm = (theme: ITheme | null): FormInputs => ({
  background: theme?.background || 'white',
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
