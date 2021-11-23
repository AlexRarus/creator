import { IBlock } from 'src/dal/blocks/interfaces';

export interface IPage {
  id: number;
  label: string;
  slug: string; // строковый идентификатор страницы, который может задавать пользователь
  blocks: IBlock<any>[]; // страница может состоять из разных блоков
}
