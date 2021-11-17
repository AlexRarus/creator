import { flow, makeAutoObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';
import RootStore from 'src/dal/root-store';

class RegistrationConfirmPageStore {
  rootStore!: IRootStore;
  routerStore!: History;

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
    this.routerStore = RootStore.routing;
  }

  initAction = flow(function* (this: RegistrationConfirmPageStore) {
    yield console.log('initAction RegistrationConfirmPageStore');
  });
}

export const store = new RegistrationConfirmPageStore(RootStore);
