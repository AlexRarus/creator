export interface IBlock {
  id: number;
  type: string;
  section: number;
  data: any; // в зависимости от типа
}

export interface IBlockType {
  id: number;
  slug: string;
  label: string;
}
