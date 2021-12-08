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

export interface ISectionData {
  id: number;
  blocks: IBlock<any>[];
  label: string;
  background: string;
  backgroundUrl: string;
  borderRadius: string;
  paddingTop: string;
  paddingBottom: string;
  paddingRight: string;
  paddingLeft: string;
}
