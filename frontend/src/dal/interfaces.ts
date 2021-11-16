import { History } from 'history';

import DalAuthStore from './auth/store';
import DalPagesStore from './pages/store';
import DalBlocksStore from './blocks/store';

export interface IRootStore {
  routing: History;
  dalAuthStore: DalAuthStore;
  dalPagesStore: DalPagesStore;
  dalBlocksStore: DalBlocksStore;
}
