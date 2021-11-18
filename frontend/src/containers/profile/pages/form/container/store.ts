import { flow, makeAutoObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import API from 'src/api';
import RootStore from 'src/dal/root-store';

class PagesFormStore {
  rootStore!: IRootStore;
  routerStore!: History;

  isLoading = true;
  data: IPage | null = null;

  get API() {
    return API.endpoints.pages;
  }

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
    this.routerStore = RootStore.routing;
  }

  getMyPageBySlugAction = flow(function* (this: PagesFormStore, pageSlug: string) {
    try {
      this.isLoading = true;
      const response = yield this.API.getMyPageBySlug(pageSlug);
      this.data = response.data;
      this.isLoading = false;
    } catch (e) {
      console.log('getMyPageBySlugAction', e);
      this.isLoading = false;
    }
  });

  resetAction = () => {
    this.isLoading = true;
    this.data = null;
  };
}

export const store = new PagesFormStore(RootStore);
