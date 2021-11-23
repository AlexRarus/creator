import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore, dalPagesStore } = useStores();

  return {
    isLoading: dalPagesStore.isLoading,
    pages: dalPagesStore.pages,
    getMyPagesAction: dalPagesStore.getMyPagesAction,
    createPageAction: dalPagesStore.createPageAction,
    selectedPage: dalPagesStore.selectedPage,
    user: dalAuthStore.user,
  };
}
