import { action, flow, makeObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';

export class PagesListStore {
  rootStore!: IRootStore;
  routerStore!: History;

  constructor(RootStore: IRootStore) {
    makeObservable(this, {
      getPagesListByUsernameAction: action.bound,
    });

    this.rootStore = RootStore;
    this.routerStore = RootStore.routing;
  }

  getPagesListByUsernameAction = flow(function* (this: PagesListStore, username: string) {
    yield console.log('initAction getPagesListByUsernameAction', username);
  });
}
