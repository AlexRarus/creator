import { flow, makeAutoObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import API from 'src/api';

export class PagesListStore {
  rootStore!: IRootStore;
  routerStore!: History;

  isLoading = true;
  pages: IPage[] | null = null;
  total = 0;

  get API() {
    return API.endpoints.pages;
  }

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
    this.routerStore = RootStore.routing;
  }

  getMyPagesAction = flow(function* (
    this: PagesListStore,
    username: string,
    redirectFrom?: string
  ) {
    try {
      this.isLoading = true;
      const responsePages = yield this.API.getMyPages();
      this.total = responsePages.data?.total || 0;
      this.pages = responsePages.data?.list || null;

      if (!this.total) {
        // если у пользователя еще НЕТ созданных страниц, то создаем новую страницу автоматически за него (упрощенный вход)
        const responseFirstPage = yield this.API.createPage();
        const firstPageSlug = responseFirstPage.data.slug;
        this.routerStore.push(`/${username}/${firstPageSlug}/`); // редирект на первую страницу пользователя
      } else if (this.total === 1 && redirectFrom === 'login') {
        // если у пользователя только ОДНА созданная страница, то перенаправляем его сразу на эту страницу
        const pageSlug = this.pages && this.pages[0]?.slug;
        // todo тут можно перед редиректом заполнить стор детальной страницы данными чтобы не запрашивать второй раз
        this.routerStore.push(`/profile/${username}/pages/${pageSlug}/`); // редирект на ЕДИНСТВЕННУЮ страницу пользователя
      }

      this.isLoading = false;
    } catch (e) {
      console.log('getMyPagesAction', e);
      this.isLoading = false;
    }
  });
}
