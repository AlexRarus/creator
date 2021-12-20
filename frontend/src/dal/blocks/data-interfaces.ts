import { TDimension } from 'src/components/input-components';

import { IBlock } from './interfaces';
import { IImage } from '../images/interfaces';

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

export interface ITextData {
  text: string;
}

// list
export interface IListDataWrite {
  iconSize?: string;
  fontSize?: string;
  template?: string;
  items: IListItemWrite[];
}

export interface IListData {
  iconSize?: string;
  fontSize?: string;
  template?: string;
  items: IListItem[];
}

export interface IListItemWrite {
  title?: string;
  description?: string;
  icon?: number;
}

export interface IListItem {
  id: number;
  title: string;
  description: string;
  icon?: IImage;
}

// collapsed list
export interface ICollapsedListDataWrite {
  items: ICollapsedListItemWrite[];
}

export interface ICollapsedListData {
  items: IListItem[];
}

export interface ICollapsedListItemWrite {
  title?: string;
  description?: string;
}

export interface ICollapsedListItem {
  id: number;
  title: string;
  description: string;
}
