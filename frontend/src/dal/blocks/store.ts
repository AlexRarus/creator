import { flow, makeAutoObservable } from 'mobx';
import API from 'src/api';
import { History } from 'history';
import { AxiosResponse } from 'axios';

import { IRootStore } from '../interfaces';

import { IBlockType } from './interfaces';

export default class DalBlocksStore {
  rootStore!: IRootStore;
  routerStore!: History;

  types: IBlockType[] = [];
  totalTypes = 0;

  public get API() {
    return API.endpoints.blocks;
  }

  constructor(RootStore: IRootStore, routerStore: History) {
    this.rootStore = RootStore;
    this.routerStore = routerStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getTypesListAction = flow(function* (this: DalBlocksStore) {
    try {
      const response: AxiosResponse<any> = yield this.API.getTypesList();
      this.types = response?.data?.list || [];
      this.totalTypes = response?.data?.total || 0;
    } catch (e) {
      console.log('getTypesListAction', e);
    }
  });
}
