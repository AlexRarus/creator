import { flow, makeAutoObservable } from 'mobx';
import API from 'src/api';

import { IRootStore } from '../interfaces';

import { IImage } from './interfaces';

export default class DalImagesStore {
  rootStore!: IRootStore;
  navigate!: any;

  isLoadingMyImages = false;
  myImagesTotal = 0;
  myImages: IImage[] = [];

  isLoadingCommonImages = false;
  commonImagesTotal = 0;
  commonImages: IImage[] = [];

  public get API() {
    return API.endpoints.images;
  }

  constructor(RootStore: IRootStore, navigate: any) {
    this.rootStore = RootStore;
    this.navigate = navigate;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  getMyImagesAction = flow(function* (
    this: DalImagesStore,
    block_types?: string[],
    tags?: string[]
  ) {
    try {
      this.isLoadingMyImages = true;
      const params = {
        block_types: block_types?.join(','),
        tags: tags?.join(','),
      };
      const response = yield this.API.getMyImages(params);
      this.myImagesTotal = response.data?.total || 0;
      this.myImages = response.data?.list || null;

      this.isLoadingMyImages = false;
    } catch (e) {
      console.log('getMyImagesByBlockTypeAction', e);
      this.isLoadingMyImages = false;
    }
  });

  getCommonImagesAction = flow(function* (
    this: DalImagesStore,
    block_types?: string[],
    tags?: string[],
    search?: string
  ) {
    try {
      this.isLoadingCommonImages = true;
      const params = {
        block_types: block_types?.join(','),
        tags: tags?.join(','),
        search,
      };
      const response = yield this.API.getCommonImages(params);
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
    deletingImages: IImage[],
    block_types?: string[],
    tags?: string[]
  ) {
    try {
      yield this.API.deleteImages(deletingImages.map((image: IImage) => image.id));
      yield this.getMyImagesAction(block_types, tags);
    } catch (e) {
      console.log('deleteMyImagesAction', e);
    }
  });
}
