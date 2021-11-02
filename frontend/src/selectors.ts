import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    initAction: dalAuthStore.initAction,
    getMeAction: dalAuthStore.getMeAction,
    logoutAction: dalAuthStore.logoutAction,
    access: dalAuthStore.access,
  };
}
