export type FormInputs = {
  newEmail?: string;
  currentPassword?: string;
};

// входные значение с формы создание
export interface RawData extends FormInputs {
  // добавочные данные которых нет на форме
}
