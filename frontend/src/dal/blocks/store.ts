import { flow, makeAutoObservable } from 'mobx';
import API from 'src/api';
import { AxiosResponse } from 'axios';
import { addNotificationItem } from 'src/components/notification';

import { IRootStore } from '../interfaces';

import { IBlockType } from './interfaces';

export default class DalBlocksStore {
  rootStore!: IRootStore;
  navigate!: any;

  types: IBlockType[] = [];
  buttonTypes: any[] = [];
  totalTypes = 0;

  public get API() {
    return API.endpoints.blocks;
  }

  constructor(RootStore: IRootStore, navigate: any) {
    this.rootStore = RootStore;
    this.navigate = navigate;

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

  public getButtonTypesListAction = flow(function* (this: DalBlocksStore) {
    try {
      const response: AxiosResponse<any> = yield this.API.getButtonTypesList();
      this.buttonTypes = response?.data?.list || [];
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
      if (this.rootStore.dalTemplatesStore.selectedTemplate) {
        this.rootStore.dalTemplatesStore.syncSelectTemplateAction();
      }
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
      if (this.rootStore.dalTemplatesStore.selectedTemplate) {
        this.rootStore.dalTemplatesStore.syncSelectTemplateAction();
      }
    } catch (e) {
      console.log('updateBlockAction', e);
    }
  });

  public deleteBlockAction = flow(function* (this: DalBlocksStore, id: number) {
    try {
      yield this.API.deleteBlock(id);
      // после успешного удаления блока СИНХРОНИЗИРУЕМ текущую редактируемую страницу с бэком
      this.rootStore.dalPagesStore.syncSelectPageAction();
      if (this.rootStore.dalTemplatesStore.selectedTemplate) {
        this.rootStore.dalTemplatesStore.syncSelectTemplateAction();
      }
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
