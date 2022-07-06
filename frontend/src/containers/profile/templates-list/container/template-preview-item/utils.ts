import { IAction } from 'src/components/actions';

export const actions: IAction[] = [
  {
    id: 'edit',
    label: 'Редактировать',
  },
  {
    id: 'delete',
    label: 'Удалить',
    kind: 'delete',
    needConfirm: true,
  },
];
