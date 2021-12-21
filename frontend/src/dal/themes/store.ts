import { flow, makeAutoObservable } from 'mobx';
import API from 'src/api';
import { History } from 'history';
import { COLORS } from 'src/components/theme';

import { IRootStore } from '../interfaces';

import { ITheme } from './interface';

const defaultTheme = {
  id: 0,
  background: COLORS.grey[200],
  color: COLORS.grey[900],
  headerColor: COLORS.grey[900],
  button: {
    background: COLORS.deepPurple[500],
    color: COLORS.grey[900],
    kind: 'simple',
  },
};

const initialThemes: ITheme[] = [
  {
    id: 0,
    background: COLORS.grey[200],
    color: COLORS.grey[900],
    headerColor: COLORS.grey[900],
    button: {
      background: COLORS.deepPurple[500],
      color: COLORS.grey[900],
      kind: 'simple',
    },
  },
  {
    id: 1,
    background: COLORS.deepPurple[800],
    color: COLORS.white,
    headerColor: COLORS.white,
    button: {
      background: COLORS.deepPurple[500],
      color: COLORS.grey[900],
      kind: 'simple',
    },
  },
  {
    id: 2,
    background: COLORS.yellow[700],
    color: COLORS.grey[900],
    headerColor: COLORS.grey[900],
    button: {
      background: COLORS.deepPurple[500],
      color: COLORS.grey[900],
      kind: 'simple',
    },
  },
  {
    id: 3,
    background: COLORS.brown[500],
    color: COLORS.grey[900],
    headerColor: COLORS.grey[900],
    button: {
      background: COLORS.deepPurple[500],
      color: COLORS.grey[900],
      kind: 'simple',
    },
  },
  {
    id: 4,
    background: COLORS.green[600],
    color: COLORS.grey[900],
    headerColor: COLORS.grey[900],
    button: {
      background: COLORS.deepPurple[500],
      color: COLORS.grey[900],
      kind: 'simple',
    },
  },
  {
    id: 5,
    background: COLORS.pink[600],
    color: COLORS.grey[900],
    headerColor: COLORS.grey[900],
    button: {
      background: COLORS.deepPurple[500],
      color: COLORS.grey[900],
      kind: 'simple',
    },
  },
];

export default class DalThemesStore {
  rootStore!: IRootStore;
  routerStore!: History;

  isUpdating = false; // loader для обновления данных, чтобы не мигала вся страница
  isLoading = false;
  total = 0;
  themes: ITheme[] = initialThemes; // TODO заглушка
  selectedTheme: ITheme | null = defaultTheme; // TODO заглушка

  public get API() {
    return API.endpoints.themes;
  }

  constructor(RootStore: IRootStore, routerStore: History) {
    this.rootStore = RootStore;
    this.routerStore = routerStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

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

  getThemesAction = flow(function* (this: DalThemesStore) {
    try {
      this.isLoading = true;
      // TODO нужно подключить к бэку
      const responseList = yield this.API.getThemesList();
      this.total = responseList.data?.total || 0;
      this.themes = responseList.data?.list || null;
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
