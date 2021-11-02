import { AxiosResponse } from 'axios';

export interface IMediaAPI {
  getFile(fileName: string): AxiosResponse<any>;
}

const getConfig = () => ({
  getFile: (fileName: string) => ({
    baseURL: '/',
    url: `/mediafiles/${fileName}`,
    method: 'GET',
  }),
});

export default getConfig();
