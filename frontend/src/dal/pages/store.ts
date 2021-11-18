import { makeAutoObservable } from 'mobx';
import API from 'src/api';
import { History } from 'history';

import { IPage } from './interfaces';

export default class DalPagesStore {
  routerStore!: History;

  selectedPage: IPage | null = null;

  public get API() {
    return API.endpoints.pages;
  }

  constructor(routerStore: History) {
    this.routerStore = routerStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public selectPageAction = (page: IPage) => {
    this.selectedPage = page;
  };
}
