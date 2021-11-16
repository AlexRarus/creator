import { AxiosResponse } from 'axios';

export interface IBlocksAPI {
  getBlockById(blockId: string): AxiosResponse<any>; // запрос одного блока (для редактирования)
  createBlock(pageSlug: string, type: string, data: any): AxiosResponse<any>; // создание блока
  updateBlock(blockId: string, data: any): AxiosResponse<any>; // обновление блока
  deleteBlock(blockId: string): AxiosResponse<any>;
  getTypesList(): AxiosResponse<any>;
}

const getConfig = () => ({
  getBlockById: (blockId: string) => ({
    url: `/blocks/${blockId}/`,
    method: 'GET',
  }),
  createBlock: (pageSlug: string, type: string, data: any) => ({
    url: `/blocks/`,
    method: 'POST',
    data: {
      pageSlug,
      type,
      data,
    },
  }),
  updateBlock: (blockId: string, data: any) => ({
    url: `/blocks/${blockId}/`,
    method: 'PUT',
    data: {
      // pageSlug нельзя изменить
      // type нельзя изменить
      data,
    },
  }),
  deleteBlock: (blockId: string) => ({
    url: `/blocks/${blockId}/`,
    method: 'DELETE',
  }),
  getTypesList: () => ({
    url: `/block_types/`,
    method: 'GET',
  }),
});

export default getConfig();
