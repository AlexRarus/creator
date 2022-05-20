import { flow, makeAutoObservable } from 'mobx';
import { IRootStore } from 'src/dal/interfaces';
import RootStore from 'src/dal/root-store';

class ResetPasswordPageStore {
  rootStore!: IRootStore;

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
  }

  initAction = flow(function* (this: ResetPasswordPageStore) {
    yield console.log('initAction');
  });
}

export const store = new ResetPasswordPageStore(RootStore);
