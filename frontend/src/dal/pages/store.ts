import { flow, makeAutoObservable } from 'mobx';
import API from 'src/api';
import { History } from 'history';
import { addNotificationItem } from 'src/components/notification';
import { AxiosResponse } from 'axios';

import { IRootStore } from '../interfaces';
import { IWritePage } from '../../api/endpoints/pages';

import { IPage } from './interfaces';

export default class DalPagesStore {
  rootStore!: IRootStore;
  routerStore!: History;

  isUpdating = false; // loader для обновления данных, чтобы не мигала вся страница
  isLoading = false;
  isCreatingByTemplate = false;
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
        const responseFirstPage = yield this.API.createPage({ label: 'new_page' });
        yield this.rootStore.dalAuthStore.updateMeAction(); // обновляем пользователя т.к. у него могла изменится индексная страница
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
      console.log('getMyPagesAction');
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

  getMyPageBySlugAction = flow(function* (this: DalPagesStore, pageSlug: string) {
    try {
      this.isLoading = true;
      console.log('getMyPageBySlugAction');
      const response = yield this.API.getMyPageBySlug(pageSlug);
      this.selectedPage = response.data;
      this.isLoading = false;
    } catch (e) {
      console.log('getMyPageBySlugAction', e);
      this.isLoading = false;
    }
  });

  updateMyPageAction = flow(function* (this: DalPagesStore) {
    // todo при обновлении выставляем флаг isUpdating а не isLoading
    try {
      this.isUpdating = true;
      console.log('updateMyPageAction');
      const response = yield this.API.getMyPageBySlug(this.selectedPage?.slug as string);
      this.selectedPage = response.data;
      this.isUpdating = false;
    } catch (e) {
      console.log('updateMyPageAction', e);
      this.isUpdating = false;
    }
  });

  updatePageBlocksAction = flow(function* (this: DalPagesStore, data: IWritePage) {
    try {
      this.isUpdating = true;
      yield this.API.updatePage(data);
      const response = yield this.API.getMyPageBySlug(this.selectedPage?.slug as string);
      console.log('updatePageBlocksAction');
      this.selectedPage = response.data;
      this.isUpdating = false;
    } catch (e) {
      console.log('updatePageBlocksAction', e);
      this.isUpdating = false;
    }
  });

  // синхронизирование данных страницы с бэком
  syncSelectPageAction = flow(function* (this: DalPagesStore) {
    try {
      this.isUpdating = true;
      console.log('syncSelectPageAction');
      const response = yield this.API.getMyPageBySlug(this.selectedPage?.slug as string);
      this.selectedPage = response.data;
      this.isUpdating = false;
    } catch (e) {
      console.log('syncSelectPageAction', e);
      this.isUpdating = false;
    }
  });

  deletePageAction = flow(function* (this: DalPagesStore, id: number) {
    try {
      yield this.API.deletePage(id);
      yield this.rootStore.dalAuthStore.updateMeAction(); // обновляем пользователя т.к. у него могла изменится индексная страница
      this.pages = this.pages.filter((page: IPage) => page.id !== id);
      this.selectedPage = this.pages[0];
      const username = this.rootStore.dalAuthStore.user?.username;
      if (this.routerStore.location.pathname !== `/profile/${username}/pages/`) {
        this.routerStore.push(`/profile/${username}/pages/`); // переходим к списку страниц
      }
      addNotificationItem({
        level: 'success',
        message: 'Страница успешно удалена',
      });
    } catch (e) {
      addNotificationItem({
        level: 'error',
        message: 'При удалении страницы что-то пошло не так.',
      });
      console.log('deletePageAction', e);
    }
  });

  createPageByTemplate = flow(function* (this: DalPagesStore, templateId: number) {
    try {
      this.isCreatingByTemplate = true;
      const response: AxiosResponse<any> = yield this.API.createPageByTemplate(templateId);
      const createdPageData = response.data;
      yield this.rootStore.dalAuthStore.updateMeAction(); // обновляем пользователя т.к. у него могла изменится тема (выставилась из шаблона)
      const username = this.rootStore.dalAuthStore.user?.username;
      this.isCreatingByTemplate = false;
      this.routerStore.push(`/profile/${username}/pages/${createdPageData.slug}/`); // переходим к созданной странице
      addNotificationItem({
        level: 'success',
        message: 'Страница успешно создана из шаблона',
      });
    } catch (e) {
      addNotificationItem({
        level: 'error',
        message: 'При создании страницы из шаблона что-то пошло не так.',
      });
      console.log('createPageByTemplate', e);
      this.isCreatingByTemplate = false;
    }
  });

  public selectPageAction = (page: IPage) => {
    this.selectedPage = page;
  };
}
