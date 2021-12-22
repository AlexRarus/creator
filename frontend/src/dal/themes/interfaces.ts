// типы полей при запросе темы с бэка
export interface ITheme {
  id: number;
  author?: number; // id автора темы
  background: string;
  color: string;
  headerColor: string;
  button: {
    background: string;
    color: string;
    kind?: string;
  };
}

// при создании-редактировании темы нужно отправить другие типы полей
export interface IThemeWrite {
  id?: number;
  background?: string;
  color?: string;
  // и другие свойства, синхронизировать с ITheme
}

export interface IThemeType {
  id: number;
  slug: string;
  pricingPlan: number; // todo пока число
}
