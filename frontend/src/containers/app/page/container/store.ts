import { flow, makeAutoObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import { ITemplate } from 'src/dal/templates/interfaces';
import API from 'src/api';
import RootStore from 'src/dal/root-store';

class PageStore {
  rootStore!: IRootStore;
  routerStore!: History;

  isLoading = false;
  data: IPage | ITemplate | null = null;

  get API() {
    return API.endpoints;
  }

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
    this.routerStore = RootStore.routing;
  }

  getPageBySlugAction = flow(function* (this: PageStore, username: string, pageSlug?: string) {
    try {
      this.isLoading = true;
      const response = yield this.API.pages.getPageBySlug(username, pageSlug);
      this.data = response.data;
      this.isLoading = false;
    } catch (e) {
      console.log('getPageBySlugAction', e);
      if (e.response.status === 404) {
        this.routerStore.replace(`/${username}/404/page_not_found`);
      }
      this.isLoading = false;
    }
  });

  getTemplateBySlugAction = flow(function* (this: PageStore, templateSlug: string) {
    try {
      this.isLoading = true;
      const response = yield this.API.templates.getTemplateBySlug(templateSlug);
      this.data = response.data;
      this.isLoading = false;
    } catch (e) {
      console.log('getTemplateBySlugAction', e);
      this.isLoading = false;
    }
  });
}

export const store = new PageStore(RootStore);
