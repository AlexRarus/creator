import { AxiosResponse } from 'axios';
import { IThemeWrite } from 'src/dal/themes/interface';

export interface IThemeAPI {
  getThemesList(): AxiosResponse<any>;
  getThemeById(id: number): AxiosResponse<any>;
  createTheme(data: IThemeWrite): AxiosResponse<any>;
  updateTheme(data: IThemeWrite): AxiosResponse<any>;
  deleteTheme(id: number): AxiosResponse<any>;
}

const getConfig = () => ({
  getThemesList: () => ({
    url: `/themes/`,
    method: 'GET',
  }),
  getThemeById: (id: number) => ({
    url: `/themes/${id}/`,
    method: 'GET',
  }),
  createTheme: (data: IThemeWrite) => ({
    url: `/themes/`,
    method: 'POST',
    data,
  }),
  updateTheme: (data: IThemeWrite) => ({
    url: `/themes/`,
    method: 'PUT',
    data,
  }),
  deleteTheme: (id: number) => ({
    url: `/themes/${id}/`,
    method: 'DELETE',
  }),
});

export default getConfig();
