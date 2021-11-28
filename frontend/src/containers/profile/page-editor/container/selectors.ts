import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore, dalPagesStore } = useStores();

  return {
    isLoading: dalPagesStore.isLoading,
    data: dalPagesStore.selectedPage,
    getMyPageBySlugAction: dalPagesStore.getMyPageBySlugAction,
    updateMyPageAction: dalPagesStore.updateMyPageAction,
    user: dalAuthStore.user,
    selectPageAction: dalPagesStore.selectPageAction,
    pages: dalPagesStore.pages,
  };
}
