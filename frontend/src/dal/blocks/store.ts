import { flow, makeAutoObservable } from 'mobx';
import API from 'src/api';
import { History } from 'history';
import { AxiosResponse } from 'axios';
import { addNotificationItem } from 'src/components/notification';

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

  public createBlockAction = flow(function* (
    this: DalBlocksStore,
    { type, index, data, pageSlug }
  ) {
    try {
      yield this.API.createBlock({ index, type, data, page_slug: pageSlug });
      this.rootStore.dalPagesStore.syncSelectPageAction();
    } catch (e) {
      console.log('createBlockAction', e);
    }
  });

  public updateBlockAction = flow(function* (
    this: DalBlocksStore,
    { id, type, index, data, pageSlug }
  ) {
    try {
      yield this.API.updateBlock({ id, index, type, data, page_slug: pageSlug });
      this.rootStore.dalPagesStore.syncSelectPageAction();
    } catch (e) {
      console.log('updateBlockAction', e);
    }
  });

  public deleteBlockAction = flow(function* (this: DalBlocksStore, id: number) {
    try {
      yield this.API.deleteBlock(id);
      // после успешного удаления блока СИНХРОНИЗИРУЕМ текущую редактируемую страницу с бэком
      this.rootStore.dalPagesStore.syncSelectPageAction();
      addNotificationItem({
        level: 'success',
        message: 'Блок успешно удален',
      });
    } catch (e) {
      addNotificationItem({
        level: 'error',
        message: 'При удалении блока что-то пошло не так.',
      });
      console.log('deletePageAction', e);
    }
  });
}
