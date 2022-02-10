import { AxiosResponse } from 'axios';
import { IThemeWrite } from 'src/dal/themes/interfaces';

export interface IThemeAPI {
  getThemesByType(type: string): AxiosResponse<any>;
  getThemeById(id: number): AxiosResponse<any>;
  createTheme(data: FormData): AxiosResponse<any>;
  updateTheme(data: FormData): AxiosResponse<any>;
  deleteTheme(id: number): AxiosResponse<any>;
  getThemesTypes(): AxiosResponse<any>;
  selectTheme(id: number): AxiosResponse<any>;
}

const getConfig = () => ({
  getThemesByType: (type: string) => ({
    url: `/themes/`,
    method: 'GET',
    params: { type },
  }),
  getThemeById: (id: number) => ({
    url: `/themes/${id}/`,
    method: 'GET',
  }),
  createTheme: (data: FormData) => ({
    url: `/themes/`,
    method: 'POST',
    data,
  }),
  updateTheme: (data: FormData) => ({
    url: `/themes/`,
    method: 'PUT',
    data,
  }),
  deleteTheme: (id: number) => ({
    url: `/themes/${id}/`,
    method: 'DELETE',
  }),
  getThemesTypes: () => ({
    url: `/themes_types/`,
    method: 'GET',
  }),
  selectTheme: (id: number) => ({
    url: `/themes/${id}/select/`,
    method: 'POST',
  }),
});

export default getConfig();
