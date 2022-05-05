import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore, dalTemplatesStore, dalPagesStore } = useStores();

  return {
    isLoading: dalTemplatesStore.isLoading,
    templates: dalTemplatesStore.templates,
    getTemplatesListAction: dalTemplatesStore.getTemplatesListAction,
    deleteTemplateAction: dalTemplatesStore.deleteTemplateAction,
    createPageByTemplate: dalPagesStore.createPageByTemplate,
    user: dalAuthStore.user,
  };
}
