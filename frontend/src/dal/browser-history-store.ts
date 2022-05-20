class BrowserHistoryStore {
  static instance: BrowserHistoryStore;

  public navigate: any;

  set navigateMethod(__navigate__: any) {
    this.navigate = __navigate__;
  }

  constructor() {
    if (BrowserHistoryStore.instance) {
      return BrowserHistoryStore.instance;
    }
    BrowserHistoryStore.instance = this;

    return this;
  }
}

export default new BrowserHistoryStore();
