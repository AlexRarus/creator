import { IImage } from 'src/dal/images/interfaces';

// типы полей при запросе темы с бэка
export interface ITheme {
  id: number;
  author?: number; // id автора темы
  background: string;
  backgroundImage?: IImage | null;
  color: string;
  headerColor: string;
  buttonBackground: string;
  buttonColor: string;
  buttonKind?: string;
}

// при создании-редактировании темы нужно отправить другие типы полей
export interface IThemeWrite {
  id?: number;
  background?: string;
  backgroundImage?: number; // id изображения
  color?: string;
  headerColor?: string;
  // и другие свойства, синхронизировать с ITheme
}

export interface IThemeType {
  id: number;
  slug: string;
  pricingPlan: string;
}
