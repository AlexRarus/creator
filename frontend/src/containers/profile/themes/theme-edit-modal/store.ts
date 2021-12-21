import { flow, makeAutoObservable } from 'mobx';
import { History } from 'history';
import { IRootStore } from 'src/dal/interfaces';
import RootStore from 'src/dal/root-store';
import { ITheme } from 'src/dal/themes/interface';

export class ThemeEditorStore {
  rootStore!: IRootStore;
  routerStore!: History;

  initialized = false;
  formData: ITheme | null;

  constructor(RootStore: IRootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = RootStore;
    this.routerStore = RootStore.routing;
  }

  initAction = flow(function* (this: ThemeEditorStore, id: number | 'new') {
    if (id !== 'new') {
      this.formData = yield this.rootStore.dalThemesStore.getThemeByIdAction(id);
    }
    this.initialized = true;
  });

  resetAction = () => {
    this.initialized = false;
    this.formData = null;
  };
}

export const store = new ThemeEditorStore(RootStore);
