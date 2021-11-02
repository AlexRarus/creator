import { History } from 'history';

import DalAuthStore from './auth/store';

export interface IRootStore {
  routing: History;
  dalAuthStore: DalAuthStore;
}
