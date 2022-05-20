import { flow, makeAutoObservable } from 'mobx';
import { IRootStore } from 'src/dal/interfaces';
import RootStore from 'src/dal/root-store';

class RegistrationPageStore {
  rootStore!: IRootStore;

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
  }

  initAction = flow(function* (this: RegistrationPageStore) {
    yield console.log('initAction RegistrationPageStore');
  });
}

export const store = new RegistrationPageStore(RootStore);
