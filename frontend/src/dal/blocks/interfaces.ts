import { IAvatar } from '../auth/interfaces';

export interface IBlock<TData> {
  id: number;
  type: string;
  data: TData;
  author: IAuthor;
  [key: string]: any;
}

export interface IBlockType {
  id: number;
  slug: string;
  label: string;
}

export interface IAuthor {
  avatar?: IAvatar;
}
