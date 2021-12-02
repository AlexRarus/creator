import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalThemesStore, dalPagesStore } = useStores();

  return {
    selectedPage: dalPagesStore.selectedPage,
    isLoading: dalThemesStore.isLoading,
    isUpdating: dalThemesStore.isUpdating,
    themes: dalThemesStore.themes,
    getThemesAction: dalThemesStore.getThemesAction,
    updateThemeAction: dalThemesStore.updateThemeAction,
    selectedTheme: dalThemesStore.selectedTheme,
  };
}
