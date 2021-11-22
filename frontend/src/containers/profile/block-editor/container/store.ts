import { flow, makeAutoObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';
import API from 'src/api';
import RootStore from 'src/dal/root-store';

class BlocksFormStore {
  rootStore!: IRootStore;
  routerStore!: History;

  initialized = false;
  isLoading = false;
  data: any | null;

  get API() {
    return API.endpoints.blocks;
  }

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
    this.routerStore = RootStore.routing;
  }

  initAction = (blockId: string) => {
    if (blockId === 'new') {
      this.initialized = true;
    } else {
      this.getBlockByIdAction(blockId);
    }
  };

  getBlockByIdAction = flow(function* (this: BlocksFormStore, blockId: string) {
    try {
      this.isLoading = true;
      const response = yield this.API.getBlockById(blockId);
      this.data = response.data?.data || null;
      this.isLoading = false;
      this.initialized = true;
    } catch (e) {
      console.log('getBlockByIdAction', e);
      this.isLoading = false;
      this.initialized = true;
    }
  });
}

export const store = new BlocksFormStore(RootStore);