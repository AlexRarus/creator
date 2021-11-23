import { flow, makeAutoObservable } from 'mobx';
import API from 'src/api';
import { History } from 'history';

import { IRootStore } from '../interfaces';

import { IPage } from './interfaces';

export default class DalPagesStore {
  rootStore!: IRootStore;
  routerStore!: History;

  isLoading = false;
  total = 0;
  pages: IPage[] = [];
  selectedPage: IPage | null = null;

  public get API() {
    return API.endpoints.pages;
  }

  constructor(RootStore: IRootStore, routerStore: History) {
    this.rootStore = RootStore;
    this.routerStore = routerStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public initAction = flow(function* (this: DalPagesStore) {
    try {
      yield this.getMyPagesAction();

      if (!this.pages.length) {
        // если у пользователя еще НЕТ созданных страниц, то создаем новую страницу автоматически за него (упрощаем вход)
        const responseFirstPage = yield this.API.createPage();
        const firstPage = responseFirstPage.data;
        this.pages = [firstPage];
        this.total = 1;
        this.selectedPage = firstPage; // выбираем эту страницу активной
      }
    } catch (e) {
      console.log('DalPagesStore initAction', e);
    }
  });

  getMyPagesAction = flow(function* (this: DalPagesStore) {
    try {
      this.isLoading = true;
      const responsePages = yield this.API.getMyPages();
      this.total = responsePages.data?.total || 0;
      this.pages = responsePages.data?.list || null;

      if (this.pages.length && !this.selectedPage) {
        this.selectedPage = this.pages[0]; // выбираем первую страницу активной
      }

      this.isLoading = false;
    } catch (e) {
      console.log('getMyPagesAction', e);
      this.isLoading = false;
    }
  });

  public selectPageAction = (page: IPage) => {
    this.selectedPage = page;
  };
}
