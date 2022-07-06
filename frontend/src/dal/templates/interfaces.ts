import { IBlock } from '../blocks/interfaces';
import { ITheme } from '../themes/interfaces';

export interface ITemplate {
  id: number;
  label: string;
  slug: string; // строковый идентификатор шаблона
  blocks: IBlock<any>[]; // шаблон состоит из разных блоков
  theme: ITheme | null;
}

export interface ITemplateType {
  id: number;
  slug: string;
  pricingPlan: string;
}
