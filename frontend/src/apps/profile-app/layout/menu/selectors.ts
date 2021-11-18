import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore, dalPagesStore } = useStores();

  return {
    user: dalAuthStore.user,
    logoutAction: dalAuthStore.logoutAction,
    selectedPage: dalPagesStore.selectedPage,
  };
}
