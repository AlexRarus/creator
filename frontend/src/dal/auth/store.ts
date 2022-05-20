import { flow, makeAutoObservable, runInAction } from 'mobx';
import API from 'src/api';
import {
  ILoginData,
  IRegistrationData,
  IResendRegistrationConfirmData,
} from 'src/api/endpoints/auth';
import { AxiosResponse } from 'axios';
import { addNotificationItem } from 'src/components/notification';
import { isBrowser } from 'src/utils/detectEnvironment';

import { IRootStore } from '../interfaces';

import {
  IUser,
  IRegistrationConfirmActionData,
  IResetPasswordActionData,
  IResetPasswordConfirmActionData,
} from './interfaces';

export default class DalAuthStore {
  get API() {
    return API.endpoints.auth;
  }
  rootStore!: IRootStore;
  navigate!: any;

  isLoading = false;
  user: IUser | null = null;
  // todo ssr костыль
  access: string | null = isBrowser ? window.localStorage.getItem('access') : null;
  refresh: string | null = isBrowser ? window.localStorage.getItem('refresh') : null;

  constructor(RootStore: IRootStore, navigate: any) {
    this.rootStore = RootStore;
    this.navigate = navigate;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public initAction = flow(function* (this: DalAuthStore) {
    if (this.access) {
      API.setDefaultHeaders({ Authorization: `Bearer ${this.access}` });

      if (!this.user) {
        yield this.getMeAction(); // получаем авторизованного пользователя (в случае перезагрузки страницы)
      }
    }
  });

  public getMeAction = flow(function* (this: DalAuthStore) {
    try {
      const response: AxiosResponse<any> = yield this.API.getMe();
      this.user = (response && response.data) || null;
      // после получения пользователя инициализируем dalPagesStore что бы узнать его страницы
      yield this.rootStore.dalPagesStore.initAction();
    } catch (err) {
      console.log(err, 'DalAuthStore');
      addNotificationItem({
        level: 'error',
        message: 'Произошла ошибка на сервере',
      });
    }
  });

  public updateMeAction = async () => {
    try {
      const response: AxiosResponse<any> = await this.API.getMe();
      runInAction(() => {
        this.user = (response && response.data) || null;
      });
      return response.data;
    } catch (err) {
      console.log(err, 'DalAuthStore');
      addNotificationItem({
        level: 'error',
        message: 'Произошла ошибка на сервере',
      });
      return this.user;
    }
  };

  public loginAction = flow(function* (this: DalAuthStore, data: ILoginData) {
    try {
      const response: AxiosResponse<any> = yield this.API.login(data);
      const token = response && response.data;
      API.setDefaultHeaders({ Authorization: `Bearer ${token?.access}` });
      yield this.getMeAction(); // получаем авторизованного пользователя
      this.access = token?.access;
      this.refresh = token?.refresh;
      localStorage.setItem('access', token?.access);
      localStorage.setItem('refresh', token?.refresh);
      const selectedPageSlug = this.rootStore.dalPagesStore.selectedPage?.slug;
      this.navigate(`/profile/${this.user?.username}/pages/${selectedPageSlug}/`); // редирект на страницу пользователя
    } catch (err) {
      console.log(err, 'DalAuthStore');
      addNotificationItem({
        level: 'error',
        message: 'Произошла ошибка на сервере',
      });
    }
  });

  public registrationAction = flow(function* (this: DalAuthStore, data: IRegistrationData) {
    try {
      yield this.API.registration(data); // регистрируемся
      yield this.loginAction(data); // получаем токены для запросов и пользователя
    } catch (err) {
      console.log(err, 'DalAuthStore');
      addNotificationItem({
        level: 'error',
        message: 'Произошла ошибка на сервере',
      });
    }
  });

  public registrationConfirmAction = flow(function* (
    this: DalAuthStore,
    data: IRegistrationConfirmActionData
  ) {
    try {
      const { next, ...registrationConfirmData } = data;
      yield this.API.registrationConfirm(registrationConfirmData);
      addNotificationItem({
        level: 'success',
        message: 'Зегистрация завершена',
      });
      if (next) {
        this.navigate(next);
      }
    } catch (err) {
      console.log(err, 'DalAuthStore');
      addNotificationItem({
        level: 'error',
        message: 'Произошла ошибка на сервере',
      });
    }
  });

  public resendRegistrationConfirmAction = flow(function* (
    this: DalAuthStore,
    data: IResendRegistrationConfirmData
  ) {
    try {
      yield this.API.resendRegistrationConfirm(data);
      addNotificationItem({
        level: 'success',
        message: 'На ваш email отправленно еще одно письмо подтверждения.',
      });
    } catch (err) {
      console.log(err, 'DalAuthStore');
      addNotificationItem({
        level: 'error',
        message: 'Произошла ошибка на сервере',
      });
    }
  });

  public logoutAction = flow(function* (this: DalAuthStore) {
    try {
      if (this.refresh) {
        yield this.API.logout({ refresh: this.refresh });
      }
      this.clientLogoutAction();
    } catch (err) {
      console.log(err, 'DalAuthStore');
      addNotificationItem({
        level: 'error',
        message: 'Произошла ошибка на сервере',
      });
    }
  });

  public logoutAllAction = flow(function* (this: DalAuthStore) {
    try {
      yield this.API.logoutAll();
      this.clientLogoutAction();
    } catch (err) {
      console.log(err, 'DalAuthStore');
      addNotificationItem({
        level: 'error',
        message: 'Произошла ошибка на сервере',
      });
    }
  });

  public clientLogoutAction = () => {
    this.user = null;
    this.access = null;
    this.refresh = null;
    API.removeDefaultHeaders(['Authorization']);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.navigate('/');
  };

  public resetPasswordAction = flow(function* (this: DalAuthStore, data: IResetPasswordActionData) {
    const { next, ...resetPasswordData } = data;
    try {
      yield this.API.resetPassword(resetPasswordData);
      if (next) {
        this.navigate(next);
      }
    } catch (err) {
      console.log(err, 'DalAuthStore');
      addNotificationItem({
        level: 'error',
        message: 'Произошла ошибка на сервере',
      });
    }
  });

  public resetPasswordConfirmAction = flow(function* (
    this: DalAuthStore,
    data: IResetPasswordConfirmActionData
  ) {
    const { next, ...resetPasswordConfirmData } = data;
    try {
      yield this.API.resetPasswordConfirm(resetPasswordConfirmData);
      addNotificationItem({
        level: 'success',
        message: 'Пароль успешно восстановлен',
      });
      if (next) {
        this.navigate(next);
      }
    } catch (err) {
      console.log(err, 'DalAuthStore');
      addNotificationItem({
        level: 'error',
        message: 'Произошла ошибка на сервере',
      });
    }
  });
}
