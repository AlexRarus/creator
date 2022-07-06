import { AxiosResponse } from 'axios';

export interface ITemplatesAPI {
  getTemplatesByType(type: string): AxiosResponse<any>;
  getTemplateBySlug(templateSlug: string): AxiosResponse<any>; // запрос одной страницы
  createTemplate(data?: IWriteTemplate): AxiosResponse<any>;
  updateTemplate(data?: IWriteTemplate): AxiosResponse<any>;
  partialUpdateTemplate(data?: IWriteTemplate): AxiosResponse<any>;
  deleteTemplate(id: number): AxiosResponse<any>;
  getTemplatesTypes(): AxiosResponse<any>;
}

export interface IWriteTemplate {
  type: string;
  blocks?: number[]; // id блоков в том порядке в котором они должны сохраниться
  label?: string; // ui
  title?: string; // SEO
  slug?: string;
  id?: number;
  themeId?: number;
}

const getConfig = () => ({
  getTemplatesByType: (type: string) => ({
    url: `/templates/`,
    method: 'GET',
    params: { type },
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
  getTemplatesTypes: () => ({
    url: `/templates_types/`,
    method: 'GET',
  }),
});

export default getConfig();
