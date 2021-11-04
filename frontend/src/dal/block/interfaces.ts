export interface IBlock {
  id: number;
  type: string;
  section: number;
  data: any; // в зависимости от типа
}
