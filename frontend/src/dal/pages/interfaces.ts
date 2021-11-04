import { IBlock } from 'src/dal/block/interfaces';

export interface IPage {
  id: number;
  blocks: IBlock[];
}

export interface IWritePage {
  blocks: number[]; // id блоков в том порядке в котором они должны сохраниться
}
