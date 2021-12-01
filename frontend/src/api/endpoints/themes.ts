import { AxiosResponse } from 'axios';
import { ITheme } from 'src/components/theme/interfaces';

export interface IThemeAPI {
  getThemesList(): AxiosResponse<any>;
  getTheme(): AxiosResponse<any>;
  updateTheme(data: any): AxiosResponse<any>;
}

const getConfig = () => ({
  getThemesList: () => ({
    url: `/themes`,
    method: 'GET',
  }),
  getTheme: () => ({
    url: `/theme`,
    method: 'GET',
  }),
  updateTheme: (data: ITheme) => ({
    url: `/theme`,
    method: 'POST',
    data,
  }),
});

export default getConfig();
