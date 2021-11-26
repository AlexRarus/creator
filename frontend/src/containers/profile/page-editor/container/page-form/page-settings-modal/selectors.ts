import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalPagesStore } = useStores();

  return {
    myPages: dalPagesStore.pages,
    deletePageAction: dalPagesStore.deletePageAction,
  };
}
