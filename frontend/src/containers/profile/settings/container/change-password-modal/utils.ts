import { RawData, DataForServer } from './interfaces';

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer => ({
  current_password: rawData.currentPassword as string,
  new_password: rawData.newPassword as string,
});
