import { History } from 'history';

class BrowserHistoryStore {
  static instance: BrowserHistoryStore;

  public routing: History;

  set historyRouter(__historyRouter__: History) {
    this.routing = __historyRouter__;
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
