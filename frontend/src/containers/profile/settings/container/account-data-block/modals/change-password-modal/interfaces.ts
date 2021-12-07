export type FormInputs = {
  currentPassword?: string;
  newPassword?: string;
};

// входные значение с формы создание
export interface RawData extends FormInputs {
  // добавочные данные которых нет на форме
}
