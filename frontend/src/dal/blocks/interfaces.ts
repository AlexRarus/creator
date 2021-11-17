export interface IBlock<TData> {
  id: number;
  type: string;
  section: number;
  data: TData;
}

export interface IBlockType {
  id: number;
  slug: string;
  label: string;
}
