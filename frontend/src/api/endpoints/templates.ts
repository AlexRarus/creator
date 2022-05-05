import { AxiosResponse } from 'axios';

export interface ITemplatesAPI {
  getTemplatesList(): AxiosResponse<any>; // запрос всех шаблонов
  getTemplateBySlug(templateSlug: string): AxiosResponse<any>; // запрос одной страницы
  createTemplate(data?: IWriteTemplate): AxiosResponse<any>;
  updateTemplate(data?: IWriteTemplate): AxiosResponse<any>;
  partialUpdateTemplate(data?: IWriteTemplate): AxiosResponse<any>;
  deleteTemplate(id: number): AxiosResponse<any>;
}

export interface IWriteTemplate {
  blocks?: number[]; // id блоков в том порядке в котором они должны сохраниться
  label?: string; // ui
  title?: string; // SEO
  slug?: string;
  id?: number;
  themeId?: number;
}

const getConfig = () => ({
  getTemplatesList: () => ({
    url: `/templates/`,
    method: 'GET',
  }),
  getTemplateBySlug: (templateSlug: string) => ({
    url: `/templates/${templateSlug}/`,
    method: 'GET',
  }),
  createTemplate: (data: IWriteTemplate) => ({
    url: `/templates/`,
    method: 'POST',
    data: {
      blocks: [],
      ...data,
    },
  }),
  updateTemplate: ({ id, ...data }: IWriteTemplate) => ({
    url: `/templates/${id}/`,
    method: 'PUT',
    data,
  }),
  partialUpdateTemplate: ({ id, ...data }: IWriteTemplate) => ({
    url: `/templates/${id}/`,
    method: 'PATCH',
    data,
  }),
  deleteTemplate: (id: number) => ({
    url: `/templates/${id}/`,
    method: 'DELETE',
  }),
});

export default getConfig();
