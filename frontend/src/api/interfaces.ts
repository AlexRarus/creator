import { IAuthAPI } from './endpoints/auth';
import { IPagesAPI } from './endpoints/pages';
import { IBlocksAPI } from './endpoints/blocks';
import { IThemeAPI } from './endpoints/theme';
import { IMediaAPI } from './endpoints/media';

export interface IAPI {
  auth: IAuthAPI;
  pages: IPagesAPI;
  blocks: IBlocksAPI;
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
