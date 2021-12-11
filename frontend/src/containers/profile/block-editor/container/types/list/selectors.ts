import { toJS } from 'mobx';
import { useStores } from 'src/dal/use-stores';

import { store } from '../../store';

import { prepareDataToFormValues } from './utils';

export function useMapStoreToProps() {
  const { dalAuthStore, dalBlocksStore, dalThemesStore } = useStores();

  return {
    formDefaultValues: prepareDataToFormValues(toJS(store.block)),
    deleteBlockAction: dalBlocksStore.deleteBlockAction,
    user: dalAuthStore.user,
    selectedTheme: dalThemesStore.selectedTheme,
  };
}
