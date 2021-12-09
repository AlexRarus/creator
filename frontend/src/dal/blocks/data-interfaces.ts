import { TDimension } from 'src/components/input-components';

import { IBlock } from './interfaces';

export interface ISectionData {
  id?: number;
  blocks: IBlock<any>[];
  label?: string;
  background: string;
  backgroundUrl?: string;
  borderRadius: string;
  paddingTop: string;
  paddingBottom: string;
  paddingRight: string;
  paddingLeft: string;
}

export interface IAvatarData {
  dimension: TDimension;
}
