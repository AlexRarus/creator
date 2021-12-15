import { AxiosResponse } from 'axios';

export interface IImagesAPI {
  getCommonImagesByBlockType(blockType: string): AxiosResponse<any>;
  getMyImagesByBlockType(blockType: string): AxiosResponse<any>;
  createImage(data: FormData): AxiosResponse<any>;
  deleteImages(imagesIds: number[]): AxiosResponse<any>;
}

const getConfig = () => ({
  getCommonImagesByBlockType: (blockType: string) => ({
    url: `/images/`,
    method: 'GET',
    params: {
      block_type: blockType,
    },
  }),
  getMyImagesByBlockType: (blockType: string) => ({
    url: `/images/my/`,
    method: 'GET',
    params: {
      block_type: blockType,
    },
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
  deleteImages: (imagesIds: number[]) => ({
    url: `/images/`,
    method: 'DELETE',
    data: {
      imagesIds,
    },
  }),
});

export default getConfig();
