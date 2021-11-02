import { AxiosResponse } from 'axios';
import { ITheme } from 'src/components/theme/interfaces';

export interface IThemeAPI {
  getTheme(): AxiosResponse<any>;
  updateTheme(data: ITheme): AxiosResponse<any>;
}

const getConfig = () => ({
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
