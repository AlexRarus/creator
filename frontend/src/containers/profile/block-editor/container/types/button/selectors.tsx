import React from 'react';
import { useStores } from 'src/dal/use-stores';
import LanguageIcon from '@mui/icons-material/Language';
import LinkIcon from '@mui/icons-material/Link';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const typeLabelMap = {
  web: 'Веб сайт',
  link: 'Внутренняя страница',
  phone: 'Позвонить',
  email: 'Написать письмо',
};

const typeIconMap = {
  web: <LanguageIcon fontSize={'small'} />,
  link: <LinkIcon fontSize={'small'} />,
  phone: <CallIcon fontSize={'small'} />,
  email: <MailOutlineIcon fontSize={'small'} />,
};

const getTypeOptionsSelector = (buttonTypes: any[]) =>
  buttonTypes.map((btnType) => ({
    value: btnType?.slug,
    label: typeLabelMap[btnType?.slug],
    icon: typeIconMap[btnType?.slug],
  }));

import { store } from '../../store';

export function useMapStoreToProps() {
  const { dalAuthStore, dalBlocksStore } = useStores();

  return {
    formDefaultValues: store.block,
    buttonTypes: getTypeOptionsSelector(dalBlocksStore.buttonTypes),
    getButtonTypesListAction: dalBlocksStore.getButtonTypesListAction,
    deleteBlockAction: dalBlocksStore.deleteBlockAction,
    user: dalAuthStore.user,
  };
}
