import { flow, makeAutoObservable } from 'mobx';
import API from 'src/api';
import { History } from 'history';

import { IRootStore } from '../interfaces';

import { IImage } from './interfaces';

export default class DalImagesStore {
  rootStore!: IRootStore;
  routerStore!: History;

  isLoadingMyImages = false;
  myImagesTotal = 0;
  myImages: IImage[] = [];

  isLoadingCommonImages = false;
  commonImagesTotal = 0;
  commonImages: IImage[] = [];

  public get API() {
    return API.endpoints.images;
  }

  constructor(RootStore: IRootStore, routerStore: History) {
    this.rootStore = RootStore;
    this.routerStore = routerStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  getMyImagesByBlockTypeAction = flow(function* (this: DalImagesStore, blockType: string) {
    try {
      this.isLoadingMyImages = true;
      const response = yield this.API.getMyImagesByBlockType(blockType);
      this.myImagesTotal = response.data?.total || 0;
      this.myImages = response.data?.list || null;

      this.isLoadingMyImages = false;
    } catch (e) {
      console.log('getMyImagesByBlockTypeAction', e);
      this.isLoadingMyImages = false;
    }
  });

  getCommonImagesByBlockTypeAction = flow(function* (this: DalImagesStore, blockType: string) {
    try {
      this.isLoadingCommonImages = true;
      const response = yield this.API.getCommonImagesByBlockType(blockType);
      this.commonImagesTotal = response.data?.total || 0;
      this.commonImages = response.data?.list || null;

      this.isLoadingCommonImages = false;
    } catch (e) {
      console.log('getCommonImagesByBlockTypeAction', e);
      this.isLoadingCommonImages = false;
    }
  });

  deleteMyImagesAction = flow(function* (
    this: DalImagesStore,
    blockType: string,
    deletingImages: IImage[]
  ) {
    try {
      yield this.API.deleteImages(
        blockType,
        deletingImages.map((image: IImage) => image.id)
      );
      yield this.getMyImagesByBlockTypeAction(blockType);
    } catch (e) {
      console.log('deleteMyImagesAction', e);
    }
  });
}
