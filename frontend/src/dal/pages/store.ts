import { action, flow, makeObservable, observable } from 'mobx';
import API from 'src/api';
import { History } from 'history';
import { AxiosResponse } from 'axios';
import { addNotificationItem } from 'src/components/notification';

import { IPage } from './interfaces';

export default class DalPagesStore {
  routerStore!: History;

  list: IPage[] = [];

  public get API() {
    return API.endpoints.pages;
  }

  constructor(routerStore: History) {
    this.routerStore = routerStore;

    makeObservable(this, {
      list: observable,
      getMyPagesAction: action.bound,
    });
  }

  public getMyPagesAction = flow(function* (this: DalPagesStore) {
    try {
      const response: AxiosResponse<any> = yield this.API.getMyPages();
      this.list = response?.data || [];
    } catch (e) {
      addNotificationItem({
        level: 'error',
        message: 'Что-то пошло не так',
      });
    }
  });
}
