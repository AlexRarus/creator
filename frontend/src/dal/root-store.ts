import { History } from 'history';

import { IRootStore } from './interfaces';
import DalAuthStore from './auth/store';
import DalPagesStore from './pages/store';
import BrowserHistoryStore from './browser-history-store';

class RootStore implements IRootStore {
  static instance: RootStore;
  isInit = false;

  public routing: History;

  dalAuthStore: DalAuthStore;
  dalPagesStore: DalPagesStore;

  init() {
    if (!this.isInit) {
      this.isInit = true;
    } else {
      // console.error(new Error('ERROR::: RootStore already initialize'));
      return this;
    }

    this.routing = BrowserHistoryStore.routing;

    this.dalAuthStore = new DalAuthStore(this.routing);
    this.dalPagesStore = new DalPagesStore(this.routing);

    return this;
  }

  constructor() {
    if (RootStore.instance) {
      return RootStore.instance;
    }
    RootStore.instance = this;

    return this;
  }
}

export default new RootStore();
