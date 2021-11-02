import { IColumn } from '../interfaces';

export default function createColumnsFromData(data: any): IColumn[] {
  return data
    ? Object.keys(data).map((dataKey: string) => ({
        id: dataKey,
        label: dataKey,
        dataId: dataKey,
      }))
    : [];
}
