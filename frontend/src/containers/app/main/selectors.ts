import { useStores } from 'src/dal/use-stores';

// import { store } from './store';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    user: dalAuthStore.user,
    logoutAction: dalAuthStore.logoutAction,
  };
}
