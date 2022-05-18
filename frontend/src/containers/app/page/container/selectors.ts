import { useStores } from 'src/dal/use-stores';

import { store } from './store';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    initialized: store.initialized,
    isLoading: store.isLoading,
    data: store.data,
    resetStoreAction: store.resetStoreAction,
    getPageBySlugAction: store.getPageBySlugAction,
    getTemplateBySlugAction: store.getTemplateBySlugAction,
    user: dalAuthStore.user,
  };
}
