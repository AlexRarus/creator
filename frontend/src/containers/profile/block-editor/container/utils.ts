import { IAction } from 'src/components/form';

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
