import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore } = useStores();

  return {
    resendRegistrationConfirmAction: dalAuthStore.resendRegistrationConfirmAction,
  };
}
