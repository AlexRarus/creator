import { flow, makeAutoObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import API from 'src/api';
import RootStore from 'src/dal/root-store';

class PagesListStore {
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
    selectPageSlug?: string
  ) {
    try {
      this.isLoading = true;
      const responsePages = yield this.API.getMyPages();
      this.total = responsePages.data?.total || 0;
      this.pages = responsePages.data?.list || null;
      const hasSelectedPage = Boolean(this.rootStore.dalPagesStore.selectedPage);

      if (!this.total) {
        // если у пользователя еще НЕТ созданных страниц, то создаем новую страницу автоматически за него (упрощаем вход)
        const responseFirstPage = yield this.API.createPage();
        const firstPage = responseFirstPage.data;
        this.pages = [firstPage];
        this.total = 1;
        this.rootStore.dalPagesStore.selectPageAction(firstPage); // выбираем эту страницу активной
      } else if (this.pages) {
        const selectedPage =
          this.pages?.find((page: IPage) => page.slug === selectPageSlug) || this.pages[0];
        this.rootStore.dalPagesStore.selectPageAction(selectedPage); // выбираем эту страницу активной
      }

      // если небыло выбранной страницы и мы ее установили тут, то редиректим на нее
      if (!hasSelectedPage && this.rootStore.dalPagesStore.selectedPage) {
        this.routerStore.replace(
          `/profile/${username}/pages/${this.rootStore.dalPagesStore.selectedPage.slug}/`
        ); // редирект на первую страницу пользователя
      }

      this.isLoading = false;
    } catch (e) {
      console.log('getMyPagesAction', e);
      this.isLoading = false;
    }
  });
}

export const store = new PagesListStore(RootStore);
