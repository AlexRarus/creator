import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore, dalPagesStore, dalThemesStore } = useStores();

  return {
    isLoading: dalPagesStore.isLoading,
    isUpdating: dalPagesStore.isUpdating,
    data: dalPagesStore.selectedPage,
    getMyPageBySlugAction: dalPagesStore.getMyPageBySlugAction,
    updateMyPageAction: dalPagesStore.updateMyPageAction,
    user: dalAuthStore.user,
    selectPageAction: dalPagesStore.selectPageAction,
    pages: dalPagesStore.pages,
    selectedTheme: dalThemesStore.selectedTheme,
  };
}
