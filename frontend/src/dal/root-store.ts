import { IRootStore } from './interfaces';
import DalAuthStore from './auth/store';
import DalPagesStore from './pages/store';
import DalBlocksStore from './blocks/store';
import DalThemesStore from './themes/store';
import DalImagesStore from './images/store';
import DalTemplatesStore from './templates/store';
import BrowserHistoryStore from './browser-history-store';

class RootStore implements IRootStore {
  static instance: RootStore;
  isInit = false;

  public navigate: any;

  dalAuthStore: DalAuthStore;
  dalPagesStore: DalPagesStore;
  dalBlocksStore: DalBlocksStore;
  dalThemesStore: DalThemesStore;
  dalImagesStore: DalImagesStore;
  dalTemplatesStore: DalTemplatesStore;

  init() {
    console.log('RootStore init', BrowserHistoryStore.navigate);
    if (!this.isInit) {
      this.isInit = true;
    } else {
      // console.error(new Error('ERROR::: RootStore already initialize'));
      return this;
    }

    this.navigate = BrowserHistoryStore.navigate;

    this.dalAuthStore = new DalAuthStore(this, this.navigate);
    this.dalPagesStore = new DalPagesStore(this, this.navigate);
    this.dalThemesStore = new DalThemesStore(this, this.navigate);
    this.dalImagesStore = new DalImagesStore(this, this.navigate);
    this.dalBlocksStore = new DalBlocksStore(this, this.navigate);
    this.dalTemplatesStore = new DalTemplatesStore(this, this.navigate);

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
