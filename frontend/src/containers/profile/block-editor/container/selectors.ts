import { useStores } from 'src/dal/use-stores';

import { store } from './store';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    isLoading: store.isLoading,
    initialized: store.initialized,
    initAction: store.initAction,
    user: dalAuthStore.user,
  };
}
