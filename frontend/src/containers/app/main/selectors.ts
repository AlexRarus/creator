import { useStores } from 'src/dal/use-stores';
// import RootStore from 'src/dal/root-store';
//
// import { MainPageStore } from './store';
//
// const store = new MainPageStore(RootStore);

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    user: dalAuthStore.user,
    logoutAction: dalAuthStore.logoutAction,
  };
}
