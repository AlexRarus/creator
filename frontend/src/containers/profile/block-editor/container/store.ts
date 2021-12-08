import { flow, makeAutoObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';
import API from 'src/api';
import RootStore from 'src/dal/root-store';
import { IBlock } from 'src/dal/blocks/interfaces';

class BlocksFormStore {
  rootStore!: IRootStore;
  routerStore!: History;

  initialized = false;
  isLoading = true;
  block: IBlock<any> | null;

  get API() {
    return API.endpoints.blocks;
  }

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
    this.routerStore = RootStore.routing;
  }

  initAction = (blockId: number | string) => {
    if (blockId === 'new') {
      this.initialized = true;
      this.isLoading = false;
    } else {
      this.getBlockByIdAction(blockId as number);
    }
  };

  getBlockByIdAction = flow(function* (this: BlocksFormStore, blockId: number) {
    try {
      this.isLoading = true;
      const response = yield this.API.getBlockById(blockId);
      this.block = response.data || null;
      this.isLoading = false;
      this.initialized = true;
    } catch (e) {
      console.log('getBlockByIdAction', e);
      this.isLoading = false;
      this.initialized = true;
    }
  });

  resetAction = () => {
    this.initialized = false;
    this.block = null;
  };
}

export const store = new BlocksFormStore(RootStore);
