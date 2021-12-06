import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore, dalPagesStore, dalThemesStore, dalBlocksStore } = useStores();

  return {
    isLoading: dalPagesStore.isLoading,
    isUpdating: dalPagesStore.isUpdating,
    data: dalPagesStore.selectedPage,
    createBlockAction: dalBlocksStore.createBlockAction,
    deleteBlockAction: dalBlocksStore.deleteBlockAction,
    updateBlockAction: dalBlocksStore.updateBlockAction,
    getMyPageBySlugAction: dalPagesStore.getMyPageBySlugAction,
    updatePageBlocksAction: dalPagesStore.updatePageBlocksAction,
    updatePartPageDataAction: dalPagesStore.updateMyPageAction,
    user: dalAuthStore.user,
    selectPageAction: dalPagesStore.selectPageAction,
    pages: dalPagesStore.pages,
    selectedTheme: dalThemesStore.selectedTheme,
  };
}
