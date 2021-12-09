export interface IBlock<TData> {
  id: number;
  type: string;
  data: TData;
  [key: string]: any;
}

export interface IBlockType {
  id: number;
  slug: string;
  label: string;
}
