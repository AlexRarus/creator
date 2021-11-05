import { useStores } from 'src/dal/use-stores';

import { store } from './index';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    getPagesListByUsernameAction: store.getPagesListByUsernameAction,
    user: dalAuthStore.user,
  };
}
