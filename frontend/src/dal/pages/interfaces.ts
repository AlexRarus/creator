import { IBlock } from 'src/dal/block/interfaces';

export interface IPage {
  id: number;
  slug: string; // строковый идентификатор страницы, который может задавать пользователь
  blocks: IBlock[];
}
