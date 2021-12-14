import { IAuthAPI } from './endpoints/auth';
import { IPagesAPI } from './endpoints/pages';
import { IBlocksAPI } from './endpoints/blocks';
import { IThemeAPI } from './endpoints/themes';
import { IImagesAPI } from './endpoints/images';

export interface IAPI {
  auth: IAuthAPI;
  pages: IPagesAPI;
  blocks: IBlocksAPI;
  themes: IThemeAPI;
  images: IImagesAPI;
}

export interface IGetListParams {
  limit: number;
  offset: number;
  search?: string;
  ordering?: any; // 'id' или '-id' для направления сортировки
  [filterKey: string]: any; // любые поля для фильтрации, например: "for_lesson: true"
}
