import { AxiosResponse } from 'axios';

export interface IImagesAPI {
  getCommonImages(params: any): AxiosResponse<any>;
  getMyImages(params: any): AxiosResponse<any>;
  createImage(data: FormData): AxiosResponse<any>;
  updateImage(data: FormData): AxiosResponse<any>;
  deleteImages(imagesIds: number[]): AxiosResponse<any>;
}

export interface IWriteImage {
  id?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  ratio?: number;
  borderRadius?: number;
  width?: number;
  height?: number;
  file?: File;
  previewFile?: File;
  block_types?: string[];
}

const getConfig = () => ({
  getCommonImages: (params: any) => ({
    url: `/images/`,
    method: 'GET',
    params,
  }),
  getMyImages: (params: any) => ({
    url: `/images/my/`,
    method: 'GET',
    params,
  }),
  createImage: (data: FormData) => ({
    url: `/images/`,
    method: 'POST',
    timeout: 0,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  }),
  updateImage: (data: FormData) => ({
    url: `/images/`,
    method: 'PUT',
    timeout: 0,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  }),
  deleteImages: (imagesIds: number[]) => ({
    url: `/images/`,
    method: 'DELETE',
    data: {
      imagesIds,
    },
  }),
});

export default getConfig();
