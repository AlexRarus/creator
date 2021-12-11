import { useStores } from 'src/dal/use-stores';

import { store } from '../../store';

import { prepareDataToFormValues } from './utils';

export function useMapStoreToProps() {
  const { dalAuthStore, dalBlocksStore, dalThemesStore } = useStores();

  return {
    formDefaultValues: prepareDataToFormValues(store.block),
    deleteBlockAction: dalBlocksStore.deleteBlockAction,
    user: dalAuthStore.user,
    selectedTheme: dalThemesStore.selectedTheme,
  };
}
