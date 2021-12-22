import { IBlock } from 'src/dal/blocks/interfaces';
import { ITheme } from 'src/dal/themes/interfaces';

interface IPageAuthor {
  theme: ITheme | null;
}

export interface IPage {
  id: number;
  author: IPageAuthor;
  label: string;
  slug: string; // строковый идентификатор страницы, который может задавать пользователь
  blocks: IBlock<any>[]; // страница может состоять из разных блоков
}
