import { AxiosResponse } from 'axios';

export interface IPagesAPI {
  getMyPages(): AxiosResponse<any>; // запрос все страниц пользователя
}

const getConfig = () => ({
  getMyPages: () => ({
    url: `/pages/my/`,
    method: 'GET',
  }),
});

export default getConfig();
