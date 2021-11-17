import { flow, makeAutoObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';
import RootStore from 'src/dal/root-store';

class ResetPasswordConfirmStore {
  rootStore!: IRootStore;
  routerStore!: History;

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
    this.routerStore = RootStore.routing;
  }

  initAction = flow(function* (this: ResetPasswordConfirmStore) {
    yield console.log('initAction ResetPasswordConfirmStore');
  });
}

export const store = new ResetPasswordConfirmStore(RootStore);
