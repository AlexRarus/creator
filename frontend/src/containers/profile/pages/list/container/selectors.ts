import { useStores } from 'src/dal/use-stores';
import RootStore from 'src/dal/root-store';

import { PagesListStore } from './store';

const store = new PagesListStore(RootStore);

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    isLoading: store.isLoading,
    pages: store.pages,
    getMyPagesAction: store.getMyPagesAction,
    user: dalAuthStore.user,
  };
}
