import { useStores } from 'src/dal/use-stores';

import { store } from './index';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    initAction: store.initAction,
    registrationConfirmAction: dalAuthStore.registrationConfirmAction,
    resendRegistrationConfirmAction: dalAuthStore.resendRegistrationConfirmAction,
  };
}
