import { IImage } from '../images/interfaces';

import { IBlock } from './interfaces';
import { IOption } from '../../components/select';

export interface ISectionData {
  id?: number;
  blocks: IBlock<any>[];
  label?: string;
  backgroundType?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImage?: IImage | null;
  backgroundRepeat?: string;
  backgroundSmooth?: boolean;
  backgroundParallax?: boolean;
  backgroundSize?: string;
  backgroundPosition?: string;
  color?: string;
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
  backgroundImage?: number | null;
  backgroundRepeat?: string;
  backgroundSmooth?: boolean;
  backgroundParallax?: boolean;
  backgroundSize?: string;
  backgroundPosition?: string;
  color?: string;
  borderRadius?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingRight?: string;
  paddingLeft?: string;
}
