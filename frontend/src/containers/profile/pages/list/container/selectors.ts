import { useStores } from 'src/dal/use-stores';

import { store } from './store';

export function useMapStoreToProps() {
  const { dalAuthStore, dalPagesStore } = useStores();

  return {
    isLoading: store.isLoading,
    pages: store.pages,
    getMyPagesAction: store.getMyPagesAction,
    selectedPage: dalPagesStore.selectedPage,
    user: dalAuthStore.user,
  };
}
