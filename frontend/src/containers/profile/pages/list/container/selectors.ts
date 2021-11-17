import { useStores } from 'src/dal/use-stores';

import { store } from './store';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    isLoading: store.isLoading,
    pages: store.pages,
    getMyPagesAction: store.getMyPagesAction,
    user: dalAuthStore.user,
  };
}
