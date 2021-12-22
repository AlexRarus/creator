import React from 'react';
import { useStores } from 'src/dal/use-stores';

const getInitialFormDefaultVale = (block: any) => {
  return {
    value: block?.data?.value || 0,
    isWide: block?.data?.isWide || false,
    isTransparent: block?.data?.isTransparent || false,
    kind: block?.data?.kind || 'empty',
    icon: block?.data?.icon,
  };
};

import { store } from '../../store';

export function useMapStoreToProps() {
  const { dalAuthStore, dalBlocksStore, dalThemesStore } = useStores();

  return {
    formDefaultValues: getInitialFormDefaultVale(store.block),
    getButtonTypesListAction: dalBlocksStore.getButtonTypesListAction,
    deleteBlockAction: dalBlocksStore.deleteBlockAction,
    user: dalAuthStore.user,
    selectedTheme: dalThemesStore.selectedTheme,
  };
}
