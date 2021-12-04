export interface IBlock<TData> {
  id: number;
  type: string;
  data: TData;
  section?: string;
}

export interface IBlockType {
  id: number;
  slug: string;
  label: string;
}
