import { useStores } from 'src/dal/use-stores';

import { store } from './index';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    isLoading: store.isLoading,
    getBlockByIdAction: store.getBlockByIdAction,
    user: dalAuthStore.user,
  };
}
