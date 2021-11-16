import { flow, makeAutoObservable } from 'mobx';
import API from 'src/api';
import {
  ILoginData,
  IRegistrationData,
  IResendRegistrationConfirmData,
} from 'src/api/endpoints/auth';
import { AxiosResponse } from 'axios';
import { History } from 'history';
import { addNotificationItem } from 'src/components/notification';

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
  routerStore!: History;

  user: IUser | null = null;
  access: string | null = localStorage.getItem('access');
  refresh: string | null = localStorage.getItem('refresh');

  constructor(routerStore: History) {
    this.routerStore = routerStore;

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
      return this.user;
    } catch (err) {
      console.log(err, 'DalAuthStore');
      addNotificationItem({
        level: 'error',
        message: 'Произошла ошибка на сервере',
      });
      return null;
    }
  });

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
      this.routerStore.push(`/profile/${this.user?.username}/pages/?redirectFrom=login`); // редирект на страницу пользователя
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
        this.routerStore.push(next);
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
    this.routerStore.push('/');
  };

  public resetPasswordAction = flow(function* (this: DalAuthStore, data: IResetPasswordActionData) {
    const { next, ...resetPasswordData } = data;
    try {
      yield this.API.resetPassword(resetPasswordData);
      if (next) {
        this.routerStore.push(next);
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
        this.routerStore.push(next);
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
