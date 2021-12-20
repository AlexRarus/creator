import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore, dalImagesStore } = useStores();

  return {
    user: dalAuthStore.user,
    myImages: dalImagesStore.myImages,
    commonImages: dalImagesStore.commonImages,
    getMyImagesAction: dalImagesStore.getMyImagesAction,
    getCommonImagesAction: dalImagesStore.getCommonImagesAction,
    deleteMyImagesAction: dalImagesStore.deleteMyImagesAction,
  };
}
