import { flow, makeAutoObservable } from 'mobx';
import { IRootStore } from 'src/dal/interfaces';
import RootStore from 'src/dal/root-store';

export class MainPageStore {
  rootStore!: IRootStore;

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
  }

  initAction = flow(function* (this: MainPageStore) {
    yield console.log('initAction MainPageStore');
  });
}

export const store = new MainPageStore(RootStore);
