import { useStores } from 'src/dal/use-stores';

import { store } from '../../store';

import { prepareDataToFormValues } from './utils';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    formDefaultValues: prepareDataToFormValues(store.data),
    user: dalAuthStore.user,
  };
}
