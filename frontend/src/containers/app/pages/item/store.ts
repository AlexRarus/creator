import { action, flow, makeObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';

export class PagesItemStore {
  rootStore!: IRootStore;
  routerStore!: History;

  constructor(RootStore: IRootStore) {
    makeObservable(this, {
      getPageBySlugAction: action.bound,
    });

    this.rootStore = RootStore;
    this.routerStore = RootStore.routing;
  }

  getPageBySlugAction = flow(function* (this: PagesItemStore, username: string, pageSlug: string) {
    yield console.log('initAction getPageBySlugAction', username, '-', pageSlug);
  });
}
