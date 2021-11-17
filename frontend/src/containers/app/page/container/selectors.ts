import { useStores } from 'src/dal/use-stores';
import RootStore from 'src/dal/root-store';

import { PageStore } from './store';

export const store = new PageStore(RootStore);

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    isLoading: store.isLoading,
    data: store.data,
    getPageBySlugAction: store.getPageBySlugAction,
    user: dalAuthStore.user,
  };
}
