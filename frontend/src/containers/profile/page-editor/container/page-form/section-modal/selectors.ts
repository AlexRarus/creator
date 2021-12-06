import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalPagesStore, dalBlocksStore } = useStores();

  return {
    myPages: dalPagesStore.pages,
    selectedPage: dalPagesStore.selectedPage,
    createBlockAction: dalBlocksStore.createBlockAction,
    deleteBlockAction: dalBlocksStore.deleteBlockAction,
    updateMyPageAction: dalPagesStore.updateMyPageAction,
  };
}
