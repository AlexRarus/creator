export type { IWriteTemplate as DataForServer } from 'src/api/endpoints/templates';

// поля формы
export type FormInputs = {
  label?: string;
};

// входные значение с формы создание
export interface RawData extends FormInputs {
  id?: number; // нет на форме, но мы подставляем при отправке формы (редактирования)
}
