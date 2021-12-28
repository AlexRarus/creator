import { IImage } from 'src/dal/images/interfaces';

// типы полей при запросе темы с бэка
export interface ITheme {
  id: number;
  author?: number; // id автора темы
  backgroundType: string;
  backgroundColor: string;
  backgroundGradient: string;
  backgroundImage?: IImage | null;
  backgroundRepeat?: boolean;
  backgroundSmooth?: boolean;
  backgroundSize?: string;
  backgroundPosition?: string;
  color: string;
  headerColor: string;
  buttonBackground: string;
  buttonColor: string;
  buttonKind?: string;
}

// при создании-редактировании темы нужно отправить другие типы полей
export interface IThemeWrite {
  id?: number;
  themeType?: string; // 'custom' | 'advanced' | 'animated' ...
  backgroundType?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImage?: number; // id изображения
  backgroundRepeat?: boolean;
  backgroundSmooth?: boolean;
  backgroundSize?: string;
  backgroundPosition?: string;
  color?: string;
  headerColor?: string;
  // и другие свойства, синхронизировать с ITheme
}

export interface IThemeType {
  id: number;
  slug: string;
  pricingPlan: string;
}
