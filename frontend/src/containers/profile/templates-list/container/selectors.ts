import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore, dalTemplatesStore, dalPagesStore } = useStores();

  return {
    isLoading: dalTemplatesStore.isLoading,
    templateTypes: dalTemplatesStore.templateTypes,
    templates: dalTemplatesStore.templates,
    getTemplatesTypesAction: dalTemplatesStore.getTemplatesTypesAction,
    getTemplatesListByTypeAction: dalTemplatesStore.getTemplatesListByTypeAction,
    deleteTemplateAction: dalTemplatesStore.deleteTemplateAction,
    createPageByTemplate: dalPagesStore.createPageByTemplate,
    user: dalAuthStore.user,
  };
}
