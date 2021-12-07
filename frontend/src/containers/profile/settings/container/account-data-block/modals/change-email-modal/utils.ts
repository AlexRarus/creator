import { ISetEmail as DataForServer } from 'src/api/endpoints/auth';

import { RawData } from './interfaces';

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer => ({
  new_email: rawData.newEmail as string,
  current_password: rawData.currentPassword as string,
});
