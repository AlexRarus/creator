import { flow, makeAutoObservable } from 'mobx';
import { IRootStore } from 'src/dal/interfaces';
import RootStore from 'src/dal/root-store';

class ResetPasswordConfirmStore {
  rootStore!: IRootStore;

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
  }

  initAction = flow(function* (this: ResetPasswordConfirmStore) {
    yield console.log('initAction ResetPasswordConfirmStore');
  });
}

export const store = new ResetPasswordConfirmStore(RootStore);
