class BrowserHistoryStore {
  static instance: BrowserHistoryStore;

  public routing: any;

  set navigate(__navigate__: any) {
    this.routing = __navigate__;
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
