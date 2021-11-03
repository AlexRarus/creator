import { AxiosResponse } from 'axios';

export interface IAuthAPI {
  getMe(): AxiosResponse<any>; // запрос пользователя
  login(data: ILoginData): AxiosResponse<any>; // запрос токена
  registration(data: IRegistrationData): AxiosResponse<any>; // создание пользователя
  registrationConfirm(data: IRegistrationConfirmData): AxiosResponse<any>; // подтверждение email адреса
  resendRegistrationConfirm(data: IResendRegistrationConfirmData): AxiosResponse<any>;
  logout(data: ILogoutData): AxiosResponse<any>; // прибиваем токен
  logoutAll(): AxiosResponse<any>; // прибиваем все токены
  resetPassword(data: IResetPasswordData): AxiosResponse<any>; // отправляем код для восстановления пароля на email
  resetPasswordConfirm(data: IResetPasswordConfirmData): AxiosResponse<any>; // устанавливаем новый пароль
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegistrationData extends ILoginData {
  first_name?: string;
  last_name?: string;
}

export interface IRegistrationConfirmData {
  uid: string;
  token: string;
}

export interface IResendRegistrationConfirmData {
  email: string;
}

export interface IResetPasswordData {
  email: string;
}

export interface IResetPasswordConfirmData {
  uid: string;
  token: string;
  new_password: string;
}

export interface ILogoutData {
  refresh: string;
}

const getConfig = () => ({
  getMe: () => ({
    url: `/auth/users/me/`,
    method: 'GET',
  }),
  login: (data: ILoginData) => ({
    url: `/auth/jwt/create/`,
    method: 'POST',
    data,
  }),
  registration: (data: IRegistrationData) => ({
    url: `/auth/users/`,
    method: 'POST',
    data,
  }),
  registrationConfirm: (data: IRegistrationConfirmData) => ({
    url: `/auth/users/activation/`,
    method: 'POST',
    data,
  }),
  resendRegistrationConfirm: (data: IResendRegistrationConfirmData) => ({
    url: `/auth/users/resend_activation/`,
    method: 'POST',
    data,
  }),
  logout: (data: ILogoutData) => ({
    url: `/auth/logout/`,
    method: 'POST',
    data,
  }),
  logoutAll: () => ({
    url: `/auth/logout_all/`,
    method: 'POST',
  }),
  resetPassword: (data: IResetPasswordData) => ({
    url: `/auth/users/reset_password/`,
    method: 'POST',
    data,
  }),
  resetPasswordConfirm: (data: IResetPasswordConfirmData) => ({
    url: `/auth/users/reset_password_confirm/`,
    method: 'POST',
    data,
  }),
});

export default getConfig();
