import { flow, makeAutoObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';

export class ResetPasswordPageStore {
  rootStore!: IRootStore;
  routerStore!: History;

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
    this.routerStore = RootStore.routing;
  }

  initAction = flow(function* (this: ResetPasswordPageStore) {
    yield console.log('initAction');
  });
}
