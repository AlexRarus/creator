import { flow, makeAutoObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import API from 'src/api';

export class PagesPreviewStore {
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

  getPageBySlugAction = flow(function* (
    this: PagesPreviewStore,
    username: string,
    pageSlug: string
  ) {
    try {
      this.isLoading = true;
      const response = yield this.API.getPageBySlug(username, pageSlug);
      this.data = response.data;
      this.isLoading = false;
    } catch (e) {
      console.log('getPageBySlugAction', e);
      this.isLoading = false;
    }
  });
}
