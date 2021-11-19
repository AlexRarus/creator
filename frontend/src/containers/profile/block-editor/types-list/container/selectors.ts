import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore, dalBlocksStore } = useStores();

  return {
    getTypesListAction: dalBlocksStore.getTypesListAction,
    types: dalBlocksStore.types,
    user: dalAuthStore.user,
  };
}
