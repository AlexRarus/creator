import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    initAuthAction: dalAuthStore.initAction,
    logoutAction: dalAuthStore.logoutAction,
    access: dalAuthStore.access,
  };
}
