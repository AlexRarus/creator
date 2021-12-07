import { IUpdateUsername as DataForServer } from 'src/api/endpoints/auth';

import { RawData } from './interfaces';

// преобразовываем типы и меняем поля если надо
export const prepareDataForServer = (rawData: RawData): DataForServer => ({
  username: rawData.username as string,
});
