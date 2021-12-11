import { AxiosResponse } from 'axios';

export interface IBlocksAPI {
  getBlockById(blockId: number): AxiosResponse<any>; // запрос одного блока (для редактирования)
  createBlock(data: IWriteBlock<any>): AxiosResponse<any>; // создание блока
  updateBlock(data: IWriteBlock<any>): AxiosResponse<any>; // обновление блока
  partialUpdatePage(data: IWriteBlock<any>): AxiosResponse<any>; // обновление блока
  deleteBlock(blockId: number): AxiosResponse<any>;
  getTypesList(): AxiosResponse<any>;
  getButtonTypesList(): AxiosResponse<any>;
}

export interface IWriteBlock<TypeData> {
  id?: number; // при редактировании
  index?: number; // index куда поставить созданный элемент
  page_slug?: string; // при создании
  type?: string; // при создании
  data: TypeData; // всегда
}

const getConfig = () => ({
  getBlockById: (blockId: string) => ({
    url: `/blocks/${blockId}/`,
    method: 'GET',
  }),
  createBlock: (data: IWriteBlock<any>) => ({
    url: `/blocks/`,
    method: 'POST',
    data,
  }),
  updateBlock: ({ id, ...data }: IWriteBlock<any>) => ({
    url: `/blocks/${id}/`,
    method: 'PUT',
    data,
  }),
  partialUpdatePage: ({ id, ...data }: IWriteBlock<any>) => ({
    url: `/blocks/${id}/`,
    method: 'PATCH',
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
  getButtonTypesList: () => ({
    url: `/block_button_types/`,
    method: 'GET',
  }),
});

export default getConfig();
