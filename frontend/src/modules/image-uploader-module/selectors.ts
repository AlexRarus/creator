import { useStores } from 'src/dal/use-stores';

export function useMapStoreToProps() {
  const { dalAuthStore, dalImagesStore } = useStores();

  return {
    user: dalAuthStore.user,
    myImages: dalImagesStore.myImages,
    commonImages: dalImagesStore.commonImages,
    getMyImagesByBlockTypeAction: dalImagesStore.getMyImagesByBlockTypeAction,
    getCommonImagesByBlockTypeAction: dalImagesStore.getCommonImagesByBlockTypeAction,
    deleteMyImagesAction: dalImagesStore.deleteMyImagesAction,
  };
}
