import { IImage } from 'src/dal/images/interfaces';

// типы полей при запросе темы с бэка
export interface ITheme {
  id: number;
  author?: number; // id автора темы
  backgroundType: string;
  backgroundColor: string;
  backgroundGradient: string;
  backgroundImage?: IImage | null;
  backgroundRepeat?: string;
  backgroundSmooth?: boolean;
  backgroundSize?: string;
  backgroundPosition?: string;
  color: string;
  headerColor: string;
  buttonBackground: string;
  buttonColor: string;
  buttonKind?: string;
  type?: string;
  slug?: string;
  animation?: string; // путь к файлу анимации
  animationPosition?: string; // позиция анимации
  animationSize?: string; // масштабирование анимации
  animationPreserveAspectRatioX?: string; // выравнивание анимации по горизонтали
  animationPreserveAspectRatioY?: string; // выравнивание анимации по вертикали
  animationPreserveAspectRatioScale?: string; // масштаб анимации
}

// при создании-редактировании темы нужно отправить другие типы полей
export interface IThemeWrite {
  id?: number;
  themeType?: string; // 'custom' | 'advanced' | 'animated' ...
  backgroundType?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImage?: number | null; // id изображения
  backgroundRepeat?: string;
  backgroundSmooth?: boolean;
  backgroundSize?: string;
  backgroundPosition?: string;
  animation?: null | File; // для удаления файла нужно передать null для перезаписи File.json
  animationPosition?: string;
  animationSize?: string;
  animationPreserveAspectRatioX?: string;
  animationPreserveAspectRatioY?: string;
  animationPreserveAspectRatioScale?: string;
  color?: string;
  headerColor?: string;
  // и другие свойства, синхронизировать с ITheme
}

export interface IThemeType {
  id: number;
  slug: string;
  pricingPlan: string;
}
