import DalAuthStore from './auth/store';
import DalPagesStore from './pages/store';
import DalBlocksStore from './blocks/store';
import DalThemesStore from './themes/store';
import DalImagesStore from './images/store';
import DalTemplatesStore from './templates/store';

export interface IRootStore {
  navigate: any;
  dalAuthStore: DalAuthStore;
  dalPagesStore: DalPagesStore;
  dalBlocksStore: DalBlocksStore;
  dalThemesStore: DalThemesStore;
  dalImagesStore: DalImagesStore;
  dalTemplatesStore: DalTemplatesStore;
}
