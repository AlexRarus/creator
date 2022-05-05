import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore, dalTemplatesStore, dalBlocksStore } = useStores();

  return {
    isLoading: dalTemplatesStore.isLoading,
    isUpdating: dalTemplatesStore.isUpdating,
    data: dalTemplatesStore.selectedTemplate,
    createBlockAction: dalBlocksStore.createBlockAction,
    deleteBlockAction: dalBlocksStore.deleteBlockAction,
    updateBlockAction: dalBlocksStore.updateBlockAction,

    getTemplateBySlugAction: dalTemplatesStore.getTemplateBySlugAction,
    updateSelectedTemplateAction: dalTemplatesStore.updateSelectedTemplateAction,
    updateTemplateBlocksAction: dalTemplatesStore.updateTemplateBlocksAction,
    selectTemplateAction: dalTemplatesStore.selectTemplateAction,

    user: dalAuthStore.user,
    templates: dalTemplatesStore.templates,
  };
}
