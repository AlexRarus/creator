import { action, flow, makeObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';

export class ResetPasswordConfirmStore {
  rootStore!: IRootStore;
  routerStore!: History;

  constructor(RootStore: IRootStore) {
    makeObservable(this, {
      initAction: action.bound,
    });

    this.rootStore = RootStore;
    this.routerStore = RootStore.routing;
  }

  initAction = flow(function* (this: ResetPasswordConfirmStore) {
    yield console.log('initAction ResetPasswordConfirmStore');
  });
}
