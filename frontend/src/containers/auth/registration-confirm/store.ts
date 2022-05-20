import { flow, makeAutoObservable } from 'mobx';
import { IRootStore } from 'src/dal/interfaces';
import RootStore from 'src/dal/root-store';

class RegistrationConfirmPageStore {
  rootStore!: IRootStore;

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
  }

  initAction = flow(function* (this: RegistrationConfirmPageStore) {
    yield console.log('initAction RegistrationConfirmPageStore');
  });
}

export const store = new RegistrationConfirmPageStore(RootStore);
