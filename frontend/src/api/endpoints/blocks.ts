import { AxiosResponse } from 'axios';

export interface IBlocksAPI {
  getBlockById(blockId: string): AxiosResponse<any>; // запрос одного блока (для редактирования)
  createBlock(data: ICreateBlock): AxiosResponse<any>; // создание блока
  updateBlock(data: IUpdateBlock): AxiosResponse<any>; // обновление блока
  deleteBlock(blockId: string): AxiosResponse<any>;
  getTypesList(): AxiosResponse<any>;
}

export interface ICreateBlock {
  page_slug: string;
  type: string;
  data: any;
}

export interface IUpdateBlock {
  id: string;
  data: any;
}

const getConfig = () => ({
  getBlockById: (blockId: string) => ({
    url: `/blocks/${blockId}/`,
    method: 'GET',
  }),
  createBlock: (data: ICreateBlock) => ({
    url: `/blocks/`,
    method: 'POST',
    data,
  }),
  updateBlock: ({ id, ...data }: IUpdateBlock) => ({
    url: `/blocks/${id}/`,
    method: 'PUT',
    data,
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
