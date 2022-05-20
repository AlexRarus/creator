import { flow, makeAutoObservable } from 'mobx';
import API from 'src/api';

import { IRootStore } from '../interfaces';

import { ITheme, IThemeType } from './interfaces';

export default class DalThemesStore {
  rootStore!: IRootStore;
  navigate!: any;

  isLoading = false;
  total = 0;
  themes: ITheme[] = [];
  themesTypes: IThemeType[] = [];

  public get API() {
    return API.endpoints.themes;
  }

  constructor(RootStore: IRootStore, navigate: any) {
    this.rootStore = RootStore;
    this.navigate = navigate;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  getThemesTypesAction = flow(function* (this: DalThemesStore) {
    try {
      this.isLoading = true;
      const response = yield this.API.getThemesTypes();
      this.isLoading = false;
      this.themesTypes = response.data || [];
    } catch (e) {
      console.log('getThemesTypesAction', e);
      this.isLoading = false;
    }
  });

  getThemeByIdAction = flow(function* (this: DalThemesStore, id: number) {
    try {
      this.isLoading = true;
      const response = yield this.API.getThemeById(id);
      this.isLoading = false;
      return response.data || null;
    } catch (e) {
      console.log('getThemeByIdAction', e);
      this.isLoading = false;
      return null;
    }
  });

  getThemesByTypeAction = flow(function* (this: DalThemesStore, type: string) {
    try {
      this.isLoading = true;
      const responseList = yield this.API.getThemesByType(type);
      this.total = responseList.data?.total || 0;
      this.themes = responseList.data?.list || null;
      this.isLoading = false;
    } catch (e) {
      console.log('getThemesAction', e);
      this.isLoading = false;
    }
  });

  deleteThemeAction = flow(function* (this: DalThemesStore, id: number) {
    try {
      yield this.API.deleteTheme(id);
    } catch (e) {
      console.log('deleteThemeAction', e);
    }
  });

  selectThemeAction = flow(function* (this: DalThemesStore, theme: ITheme) {
    try {
      this.isLoading = true;
      yield this.API.selectTheme(theme.id);
      this.rootStore.dalAuthStore.updateMeAction();
      this.isLoading = false;
    } catch (e) {
      console.log('selectThemeAction', e);
      this.isLoading = false;
    }
  });
}
