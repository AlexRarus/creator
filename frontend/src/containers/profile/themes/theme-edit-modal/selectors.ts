import { useStores } from 'src/dal/use-stores';

import { store } from './store';
import { prepareDataToForm } from './utils';

export function useMapStoreToProps() {
  const { dalAuthStore, dalThemesStore } = useStores();
  const user = dalAuthStore.user;

  return {
    user,
    initialized: store.initialized,
    initAction: store.initAction,
    resetAction: store.resetAction,
    formDefaultValues: prepareDataToForm(store.formData),
    isAuthor: Boolean(user && store.formData?.author === user?.id),
    deleteThemeAction: dalThemesStore.deleteThemeAction,
  };
}
