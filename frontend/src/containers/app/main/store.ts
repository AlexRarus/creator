import { action, flow, makeObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';

export class MainPageStore {
  rootStore!: IRootStore;
  routerStore!: History;

  constructor(RootStore: IRootStore) {
    makeObservable(this, {
      initAction: action.bound,
    });

    this.rootStore = RootStore;
    this.routerStore = RootStore.routing;
  }

  initAction = flow(function* (this: MainPageStore) {
    yield console.log('initAction MainPageStore');
  });
}
