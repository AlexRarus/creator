import { IAuthAPI } from './endpoints/auth';
import { IThemeAPI } from './endpoints/theme';
import { IMediaAPI } from './endpoints/media';

export interface IAPI {
  auth: IAuthAPI;
  theme: IThemeAPI;
  media: IMediaAPI;
}

export interface IGetListParams {
  limit: number;
  offset: number;
  search?: string;
  ordering?: any; // 'id' или '-id' для направления сортировки
  [filterKey: string]: any; // любые поля для фильтрации, например: "for_lesson: true"
}
