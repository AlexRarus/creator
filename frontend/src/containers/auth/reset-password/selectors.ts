import { useStores } from 'src/dal/use-stores';

import { store } from './store';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    initAction: store.initAction,
    resetPasswordAction: dalAuthStore.resetPasswordAction,
  };
}
