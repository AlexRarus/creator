import { ITab } from 'src/components/tabs';
import { IAction } from 'src/components/form';
import { IImage } from 'src/dal/images/interfaces';

export enum TabValue {
  common = 'common',
  my = 'my',
}

export const imagesTabs: ITab<TabValue>[] = [
  {
    value: TabValue.common,
    label: 'Выбор изображения',
  },
  {
    value: TabValue.my,
    label: 'Загрузка изображения',
  },
];

export const getMyImagesActions = (selectedImages: IImage[]): IAction[] => [
  {
    id: 'delete',
    label: 'Удалить выбранные',
    kind: 'delete',
    disabled: !selectedImages.length,
    needConfirm: true,
  },
  {
    id: 'upload',
    label: 'Загрузить',
  },
];
