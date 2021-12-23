import { IImage } from '../images/interfaces';

import { IBlock } from './interfaces';

export interface ISectionData {
  id?: number;
  blocks: IBlock<any>[];
  label?: string;
  background: string;
  backgroundImage?: IImage;
  borderRadius: string;
  paddingTop: string;
  paddingBottom: string;
  paddingRight: string;
  paddingLeft: string;
}

export interface ISectionDataWrite {
  id?: number;
  blocks: number[];
  label?: string;
  background?: string;
  backgroundImage?: number;
  borderRadius?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingRight?: string;
  paddingLeft?: string;
}
