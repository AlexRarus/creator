import { flow, makeAutoObservable } from 'mobx';
import API from 'src/api';
import { History } from 'history';
import { COLORS } from 'src/components/theme';

import { IRootStore } from '../interfaces';

import { ITheme } from './interface';

const initialThemes: ITheme[] = [
  {
    id: 1,
    background: COLORS.deepPurple[800],
    color: COLORS.white,
    headerColor: COLORS.white,
  },
  {
    id: 2,
    background: COLORS.yellow[700],
    color: COLORS.grey[900],
    headerColor: COLORS.grey[900],
  },
  {
    id: 3,
    background: COLORS.brown[500],
    color: COLORS.grey[900],
    headerColor: COLORS.grey[900],
  },
  {
    id: 4,
    background: COLORS.green[600],
    color: COLORS.grey[900],
    headerColor: COLORS.grey[900],
  },
  {
    id: 5,
    background: COLORS.pink[600],
    color: COLORS.grey[900],
    headerColor: COLORS.grey[900],
  },
];

export default class DalThemesStore {
  rootStore!: IRootStore;
  routerStore!: History;

  isUpdating = false; // loader для обновления данных, чтобы не мигала вся страница
  isLoading = false;
  total = 0;
  themes: ITheme[] = initialThemes; // TODO заглушка
  selectedTheme: ITheme | null = null;

  public get API() {
    return API.endpoints.themes;
  }

  constructor(RootStore: IRootStore, routerStore: History) {
    this.rootStore = RootStore;
    this.routerStore = routerStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  getThemesAction = flow(function* (this: DalThemesStore) {
    try {
      this.isLoading = true;
      // TODO нужно подключить к бэку
      const responseList = yield this.API.getThemesList();
      this.total = 100; // responsePages.data?.total || 0;
      this.themes = responseList; // responsePages.data?.list || null;
      this.isLoading = false;
    } catch (e) {
      console.log('getThemesAction', e);
      this.isLoading = false;
    }
  });

  updateThemeAction = flow(function* (this: DalThemesStore, data: ITheme) {
    try {
      this.isUpdating = true;
      this.selectedTheme = data;
      yield this.API.updateTheme(data);
      // const response = yield this.API.getMyPageBySlug();
      this.isUpdating = false;
    } catch (e) {
      console.log('selectThemeAction', e);
      this.isUpdating = false;
    }
  });
}
