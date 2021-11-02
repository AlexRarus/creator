import { action, flow, makeObservable, observable } from 'mobx';
import API from 'src/api';
import {
  ILoginData,
  IRegistrationData,
  IActivationData,
  IResendActivationData,
  IResetPasswordData,
  IResetPasswordConfirmData,
} from 'src/api/endpoints/auth';
import { AxiosResponse } from 'axios';
import { History } from 'history';

import { IUser } from './interfaces';

interface ILoginActionData extends ILoginData {
  next?: string;
}
interface IRegistrationActionData extends IRegistrationData {
  next?: string;
}
interface IActivationActionData extends IActivationData {
  next?: string;
}
interface IResetPasswordActionData extends IResetPasswordData {
  next?: string;
}
interface IResetPasswordConfirmActionData extends IResetPasswordConfirmData {
  next?: string;
}

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

    makeObservable(this, {
      user: observable,
      access: observable,
      refresh: observable,
      initAction: action.bound,
      getMeAction: action.bound,
      loginAction: action.bound,
      registrationAction: action.bound,
      activationAction: action.bound,
      resendActivationAction: action.bound,
      logoutAction: action.bound,
      logoutAllAction: action.bound,
      clientLogoutAction: action.bound,
      resetPasswordAction: action.bound,
      resetPasswordConfirmAction: action.bound,
    });
  }

  public initAction = () => {
    API.setDefaultHeaders({ Authorization: `Bearer ${this.access}` });
  };

  public getMeAction = flow(function* (this: DalAuthStore) {
    try {
      const response: AxiosResponse<any> = yield this.API.getMe();
      this.user = (response && response.data) || null;
      return this.user;
    } catch (err) {
      console.log(err, 'DalAuthStore');
      return null;
    }
  });

  public loginAction = flow(function* (this: DalAuthStore, data: ILoginActionData) {
    try {
      const response: AxiosResponse<any> = yield this.API.login(data);
      const token = response && response.data;
      this.access = token?.access;
      this.refresh = token?.refresh;
      localStorage.setItem('access', token?.access);
      localStorage.setItem('refresh', token?.refresh);

      this.routerStore.push(data?.next || '/');
    } catch (err) {
      console.log(err, 'DalAuthStore');
    }
  });

  public registrationAction = flow(function* (this: DalAuthStore, data: IRegistrationActionData) {
    try {
      yield this.API.registration(data); // регистрируемся
      yield this.loginAction(data); // получаем токен
    } catch (err) {
      console.log(err, 'DalAuthStore');
    }
  });

  public activationAction = flow(function* (this: DalAuthStore, data: IActivationActionData) {
    try {
      yield this.API.activation(data);
    } catch (err) {
      console.log(err, 'DalAuthStore');
    }
  });

  public resendActivationAction = flow(function* (this: DalAuthStore, data: IResendActivationData) {
    try {
      yield this.API.resendActivation(data);
    } catch (err) {
      console.log(err, 'DalAuthStore');
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
    }
  });

  public logoutAllAction = flow(function* (this: DalAuthStore) {
    try {
      yield this.API.logoutAll();
      this.clientLogoutAction();
    } catch (err) {
      console.log(err, 'DalAuthStore');
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
    try {
      yield this.API.resetPassword(data);
    } catch (err) {
      console.log(err, 'DalAuthStore');
    }
  });

  public resetPasswordConfirmAction = flow(function* (
    this: DalAuthStore,
    data: IResetPasswordConfirmActionData
  ) {
    try {
      yield this.API.resetPasswordConfirm(data);
    } catch (err) {
      console.log(err, 'DalAuthStore');
    }
  });
}
