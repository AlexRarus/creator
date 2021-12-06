// поля формы
export type FormInputs = {
  background?: string;
  borderRadius?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingRight?: string;
  paddingLeft?: string;
};

// входные значение с формы создание
export interface RawData extends FormInputs {
  id?: number; // нет на форме, но мы подставляем при отправке формы (редактирования)
  type?: string; // нет на форме, но мы подставляем при создании блока секции
}
