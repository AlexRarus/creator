import { useStores } from 'src/dal/use-stores';

import { store } from '../../store';

import { prepareDataToFormValues, typeLabelMap, typeIconMap } from './utils';

const getTypeOptionsSelector = (buttonTypes: any[]) =>
  buttonTypes.map((btnType) => ({
    value: btnType?.slug,
    label: typeLabelMap[btnType?.slug],
    icon: typeIconMap[btnType?.slug],
  }));

export function useMapStoreToProps() {
  const { dalAuthStore, dalBlocksStore } = useStores();

  return {
    formDefaultValues: prepareDataToFormValues(store.block),
    buttonTypes: getTypeOptionsSelector(dalBlocksStore.buttonTypes),
    getButtonTypesListAction: dalBlocksStore.getButtonTypesListAction,
    deleteBlockAction: dalBlocksStore.deleteBlockAction,
    user: dalAuthStore.user,
  };
}
