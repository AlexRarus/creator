import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalPagesStore, dalAuthStore } = useStores();

  return {
    myPages: dalPagesStore.pages,
    deletePageAction: dalPagesStore.deletePageAction,
    user: dalAuthStore.user,
  };
}
