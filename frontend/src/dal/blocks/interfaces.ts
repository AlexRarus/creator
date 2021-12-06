export interface IBlock<TData> {
  id: number;
  type: string;
  data: TData;
}

export interface IBlockType {
  id: number;
  slug: string;
  label: string;
}
