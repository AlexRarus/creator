export enum TabValue {
  LINK = 'LINK',
  QR = 'QR',
  SEO = 'SEO',
}

// поля формы
export type FormInputs = {
  slug?: string; // tab "LINK"
  title?: string; // tab "SEO"
};

// входные значение с формы создание
export interface RawData extends FormInputs {
  id?: number; // нет на форме, но мы подставляем при отправке формы (редактирования)
}
