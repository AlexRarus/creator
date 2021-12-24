import { IImage } from '../images/interfaces';

import { IBlock } from './interfaces';

export interface ISectionData {
  id?: number;
  blocks: IBlock<any>[];
  label?: string;
  backgroundType?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImage?: IImage | null;
  backgroundRepeat?: boolean;
  backgroundSmooth?: boolean;
  backgroundParallax?: boolean;
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
  backgroundType?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImage?: number;
  backgroundRepeat?: boolean;
  backgroundSmooth?: boolean;
  backgroundParallax?: boolean;
  borderRadius?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingRight?: string;
  paddingLeft?: string;
}
