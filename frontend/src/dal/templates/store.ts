import { flow, makeAutoObservable } from 'mobx';
import API from 'src/api';
import { IWriteTemplate } from 'src/api/endpoints/templates';

import { IRootStore } from '../interfaces';
import { addNotificationItem } from '../../components/notification';

import { ITemplate } from './interfaces';

export default class DalTemplatesStore {
  rootStore!: IRootStore;
  navigate!: any;

  isLoading = false;
  isUpdating = false;
  total = 0;
  templates: ITemplate[] = [];
  selectedTemplate: ITemplate | null = null;

  public get API() {
    return API.endpoints.templates;
  }

  constructor(RootStore: IRootStore, navigate: any) {
    this.rootStore = RootStore;
    this.navigate = navigate;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  getTemplatesListAction = flow(function* (this: DalTemplatesStore) {
    try {
      this.isLoading = true;
      const responseList = yield this.API.getTemplatesList();
      this.total = responseList.data?.total || 0;
      this.templates = responseList.data?.list || null;
      this.isLoading = false;
    } catch (e) {
      console.log('getTemplatesListAction', e);
      this.isLoading = false;
    }
  });

  getTemplateBySlugAction = flow(function* (this: DalTemplatesStore, templateSlug: string) {
    try {
      this.isLoading = true;
      console.log('getTemplateBySlugAction');
      const response = yield this.API.getTemplateBySlug(templateSlug);
      this.selectedTemplate = response.data;
      this.isLoading = false;
    } catch (e) {
      console.log('getTemplateBySlugAction', e);
      this.isLoading = false;
    }
  });

  updateSelectedTemplateAction = flow(function* (this: DalTemplatesStore) {
    // todo при обновлении выставляем флаг isUpdating а не isLoading
    try {
      this.isUpdating = true;
      console.log('updateSelectedTemplateAction');
      const response = yield this.API.getTemplateBySlug(this.selectedTemplate?.slug as string);
      this.selectedTemplate = response.data;
      this.isUpdating = false;
    } catch (e) {
      console.log('updateSelectedTemplateAction', e);
      this.isUpdating = false;
    }
  });

  updateTemplateBlocksAction = flow(function* (this: DalTemplatesStore, data: IWriteTemplate) {
    try {
      this.isUpdating = true;
      yield this.API.updateTemplate(data);
      const response = yield this.API.getTemplateBySlug(this.selectedTemplate?.slug as string);
      console.log('updateTemplateBlocksAction');
      this.selectedTemplate = response.data;
      this.isUpdating = false;
    } catch (e) {
      console.log('updateTemplateBlocksAction', e);
      this.isUpdating = false;
    }
  });

  // синхронизирование данных шаблона с бэком
  syncSelectTemplateAction = flow(function* (this: DalTemplatesStore) {
    try {
      this.isUpdating = true;
      console.log('syncSelectTemplateAction');
      const response = yield this.API.getTemplateBySlug(this.selectedTemplate?.slug as string);
      this.selectedTemplate = response.data;
      this.isUpdating = false;
    } catch (e) {
      console.log('syncSelectTemplateAction', e);
      this.isUpdating = false;
    }
  });

  deleteTemplateAction = flow(function* (this: DalTemplatesStore, id: number) {
    try {
      yield this.API.deleteTemplate(id);
      this.templates = this.templates.filter((template: ITemplate) => template.id !== id);

      addNotificationItem({
        level: 'success',
        message: 'Шаблон успешно удален',
      });
    } catch (e) {
      addNotificationItem({
        level: 'error',
        message: 'При удалении шаблона что-то пошло не так.',
      });
      console.log('deleteTemplateAction', e);
    }
  });

  public selectTemplateAction = (template: ITemplate) => {
    this.selectedTemplate = template;
  };
}
