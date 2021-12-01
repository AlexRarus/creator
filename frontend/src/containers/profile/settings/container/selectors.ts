import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    isLoading: dalAuthStore.isLoading,
    user: dalAuthStore.user,
  };
}
