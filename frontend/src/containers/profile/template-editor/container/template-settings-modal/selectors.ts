import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalTemplatesStore } = useStores();

  return {
    myTemplates: dalTemplatesStore.templates,
    deleteTemplateAction: dalTemplatesStore.deleteTemplateAction,
  };
}
