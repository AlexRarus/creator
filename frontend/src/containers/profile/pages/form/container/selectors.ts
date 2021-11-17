import { useStores } from 'src/dal/use-stores';

import { store } from './store';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    isLoading: store.isLoading,
    data: store.data,
    getMyPageBySlugAction: store.getMyPageBySlugAction,
    user: dalAuthStore.user,
  };
}
