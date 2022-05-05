import { useStores } from 'src/dal/use-stores';

import { store } from './store';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    isLoading: store.isLoading,
    data: store.data,
    getPageBySlugAction: store.getPageBySlugAction,
    getTemplateBySlugAction: store.getTemplateBySlugAction,
    user: dalAuthStore.user,
  };
}
