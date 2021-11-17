import { useStores } from 'src/dal/use-stores';
import RootStore from 'src/dal/root-store';

import { BlocksFormStore } from './store';

const store = new BlocksFormStore(RootStore);

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    isLoading: store.isLoading,
    getBlockByIdAction: store.getBlockByIdAction,
    user: dalAuthStore.user,
  };
}
