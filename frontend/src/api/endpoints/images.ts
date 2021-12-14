import { AxiosResponse } from 'axios';

export interface IImagesAPI {
  getCommonImagesByBlockType(blockType: string): AxiosResponse<any>;
  getMyImagesByBlockType(blockType: string): AxiosResponse<any>;
  createImage(blockType: string, data: FormData): AxiosResponse<any>;
  deleteImages(blockType: string, imagesIds: number[]): AxiosResponse<any>;
}

const getConfig = () => ({
  getCommonImagesByBlockType: (blockType: string) => ({
    url: `/images/${blockType}/common/`,
    method: 'GET',
  }),
  getMyImagesByBlockType: (blockType: string) => ({
    url: `/images/${blockType}/my/`,
    method: 'GET',
  }),
  createImage: (blockType: string, data: FormData) => ({
    url: `/images/${blockType}/`,
    method: 'POST',
    timeout: 0,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  }),
  deleteImages: (blockType: string, imagesIds: number[]) => ({
    url: `/images/${blockType}/`,
    method: 'DELETE',
    data: {
      imagesIds,
    },
  }),
});

export default getConfig();
