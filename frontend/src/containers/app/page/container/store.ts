import { flow, makeAutoObservable } from 'mobx';
import { IRootStore } from 'src/dal/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import { ITemplate } from 'src/dal/templates/interfaces';
import API from 'src/api';
import RootStore from 'src/dal/root-store';
import { pageNotFoundPath } from 'src/router/routes/app-routes';
import { isBrowser } from 'src/utils/detectEnvironment';

class PageStore {
  rootStore!: IRootStore;

  initialized = false;
  isLoading = false;
  data: IPage | ITemplate | null = null;

  get API() {
    return API.endpoints;
  }

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
  }

  initSsrAction = (ssrComponentData: any) => {
    // при серверном рендеринге заполняем стор данными
    if (ssrComponentData) {
      this.data = ssrComponentData as IPage | null;
      this.initialized = true;
    }
  };

  getPageBySlugAction = flow(function* (this: PageStore, username: string, pageSlug?: string) {
    try {
      this.isLoading = true;
      const response = yield this.API.pages.getPageBySlug(username, pageSlug);
      this.data = response.data;
      this.isLoading = false;
      this.initialized = true;
    } catch (e) {
      console.log('getPageBySlugAction', e);
      if (e.response.status === 404) {
        this.rootStore.navigate(pageNotFoundPath(isBrowser ? window.location?.pathname : ''), {
          replace: true,
        });
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
      this.initialized = true;
    } catch (e) {
      console.log('getTemplateBySlugAction', e);
      this.isLoading = false;
    }
  });

  resetStoreAction = () => {
    this.data = null;
    this.initialized = false;
  };
}

export const store = new PageStore(RootStore);
