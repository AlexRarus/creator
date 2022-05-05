// fake data generator
import { IBlock } from 'src/dal/blocks/interfaces';

export const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
export const reorder = (blocks: IBlock<any>[], startIndex: number, endIndex: number) => {
  const result = Array.from(blocks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
