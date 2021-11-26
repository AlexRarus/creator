import { IAction } from 'src/components/modal-form-buttons';

export const blockActions: IAction[] = [
  {
    id: 'delete',
    label: 'Удалить',
    kind: 'delete',
    needConfirm: true,
  },
  {
    id: 'clone',
    label: 'Клонировать',
  },
];
