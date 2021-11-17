import { useStores } from 'src/dal/use-stores';
import RootStore from 'src/dal/root-store';

import { PagesFormStore } from './store';

const store = new PagesFormStore(RootStore);

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    isLoading: store.isLoading,
    data: store.data,
    getMyPageBySlugAction: store.getMyPageBySlugAction,
    user: dalAuthStore.user,
  };
}
