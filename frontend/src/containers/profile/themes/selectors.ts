import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore, dalThemesStore, dalPagesStore } = useStores();

  return {
    user: dalAuthStore.user,
    selectedPage: dalPagesStore.selectedPage,
    isLoading: dalThemesStore.isLoading,
    themes: dalThemesStore.themes,
    getThemesByTypeAction: dalThemesStore.getThemesByTypeAction,
    selectThemeAction: dalThemesStore.selectThemeAction,
    getThemesTypesAction: dalThemesStore.getThemesTypesAction,
    themesTypes: dalThemesStore.themesTypes,
  };
}
