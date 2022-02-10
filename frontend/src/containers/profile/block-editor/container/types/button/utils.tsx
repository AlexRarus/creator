import React from 'react';
import { ITab } from 'src/components/tabs';
import { IAction } from 'src/components/form';
import { IOption } from 'src/components/select';
import { IBlock } from 'src/dal/blocks/interfaces';
import { IButtonData, IButtonDataWrite } from 'src/dal/blocks/button-interfaces';
import LanguageIcon from '@mui/icons-material/Language';
import LinkIcon from '@mui/icons-material/Link';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { DataForServer } from '../../interfaces';

import { RawData, FormInputs } from './interfaces';

const backgroundTypeColor: IOption = {
  value: 'color',
  label: 'Сплошной цвет',
};
const backgroundTypeGradient: IOption = {
  value: 'gradient',
  label: 'Градиент',
};
export const backgroundTypes: IOption[] = [backgroundTypeColor, backgroundTypeGradient];

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = ({
  formInputs,
  pageSlug,
  blockId,
  blockType,
  index,
}: RawData): DataForServer<IButtonDataWrite> => {
  return {
    data: {
      label: formInputs.label,
      description: formInputs.description,
      type: formInputs?.type?.value,
      value: formInputs?.value,
      kind: formInputs?.kind,
      icon: formInputs?.icon?.id, // при прикреплении изображения нужно отправить его id
      backgroundColor: formInputs?.backgroundColor,
      color: formInputs?.color,
    },
    page_slug: pageSlug, // меняем поле для отправки на бэк
    type: blockType, // меняем поле для отправки на бэк
    id: blockId as any, // id может не быть поэтому any
    index: index as any, // index может не быть поэтому any
  };
};

// предзаполняем форму этими данными
export const prepareDataToFormValues = (block: IBlock<IButtonData> | null): FormInputs => {
  return {
    label: block?.data.label || 'Кнопка',
    description: block?.data.description || '',
    type: {
      value: block?.data?.type || 'web',
      label: typeLabelMap[block?.data?.type || 'web'],
      icon: typeIconMap[block?.data?.type || 'web'],
    },
    value: block?.data.value || '',
    kind: block?.data.value || 'simple',
    icon: block?.data?.icon || null,
    backgroundColor: block?.data.backgroundColor || '',
    color: block?.data?.color || '',
  };
};

export enum TabValue {
  button = 'button',
  preview = 'preview',
  kind = 'kind',
  settings = 'settings',
}

export const blockTabs: ITab<TabValue>[] = [
  {
    value: TabValue.button,
    label: 'Кнопка',
  },
  {
    value: TabValue.kind,
    label: 'Вид',
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

export const prepareDataForKinds = (kindsList: any[], selectedKind?: string, icon?: any) =>
  kindsList.map((kind) => ({
    id: 0,
    type: 'button',
    author: {},
    data: {
      label: selectedKind === kind ? 'Выбрана' : 'Заголовок',
      description: kind,
      value: '',
      type: 'test_type',
      kind,
      icon,
    },
  }));

export const typeLabelMap = {
  web: 'Веб сайт',
  link: 'Внутренняя страница',
  phone: 'Позвонить',
  email: 'Написать письмо',
};

export const typeIconMap = {
  web: <LanguageIcon fontSize={'small'} />,
  link: <LinkIcon fontSize={'small'} />,
  phone: <CallIcon fontSize={'small'} />,
  email: <MailOutlineIcon fontSize={'small'} />,
};
