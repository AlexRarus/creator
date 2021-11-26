import { AxiosResponse } from 'axios';

export interface IPagesAPI {
  getMyPages(): AxiosResponse<any>; // запрос все страниц пользователя
  getMyPageBySlug(pageSlug: string): AxiosResponse<any>; // запрос одной страницы
  getPageBySlug(username: string, pageSlug: string): AxiosResponse<any>; // запрос одной страницы
  createPage(data?: IWritePage): AxiosResponse<any>;
  updatePage(data?: IWritePage): AxiosResponse<any>;
  partialUpdatePage(data?: IWritePage): AxiosResponse<any>;
  deletePage(id: number): AxiosResponse<any>;
}

export interface IWritePage {
  blocks?: number[]; // id блоков в том порядке в котором они должны сохраниться
  label?: string;
  slug?: string;
  id?: number;
}

const getConfig = () => ({
  getMyPages: () => ({
    url: `/pages/my/`,
    method: 'GET',
  }),
  getMyPageBySlug: (pageSlug: string) => ({
    url: `/pages/my/${pageSlug}/`,
    method: 'GET',
  }),
  getPageBySlug: (username: string, pageSlug: string) => ({
    url: `/pages/${username}/${pageSlug}/`,
    method: 'GET',
  }),
  createPage: (data: IWritePage) => ({
    url: `/pages/my/`,
    method: 'POST',
    data: {
      blocks: [],
      ...data,
    },
  }),
  updatePage: ({ id, ...data }: IWritePage) => ({
    url: `/pages/my/${id}/`,
    method: 'PUT',
    data,
  }),
  partialUpdatePage: ({ id, ...data }: IWritePage) => ({
    url: `/pages/my/${id}/`,
    method: 'PATCH',
    data,
  }),
  deletePage: (id: number) => ({
    url: `/pages/my/${id}`,
    method: 'DELETE',
  }),
});

export default getConfig();
