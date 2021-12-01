export type { ISetPassword as DataForServer } from 'src/api/endpoints/auth';

// поля формы
export type FormInputs = {
  currentPassword?: string;
  newPassword?: string;
  newPasswordRepeat?: string;
};

// входные значение с формы создание
export interface RawData extends FormInputs {
  // нет на форме, но мы подставляем при отправке формы
}
