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
  setAvatar(data: FormData): AxiosResponse<any>; // создание (изменение) аватара
  setEmail(data: ISetEmail): AxiosResponse<any>; // изменение email
  setUsername(data: ISetUsername): AxiosResponse<any>; // изменение email
  setPassword(data: ISetPassword): AxiosResponse<any>; // изменение email
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

export interface ISetAvatar {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
  scale: number;
  rotate: number;
  sourceFile?: File;
  previewFile?: File;
}

export interface ISetEmail {
  email: string;
}

export interface ISetUsername {
  username: string;
}

export interface ISetPassword {
  current_password: string;
  new_password: string;
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
  setAvatar: (data: FormData) => ({
    url: `/avatar/`,
    method: 'POST',
    timeout: 0,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  }),
  setEmail: (data: ISetEmail) => ({
    url: `/auth/users/set_email/`, // todo уточнить endpoint
    method: 'POST',
    data,
  }),
  setUsername: (data: ISetUsername) => ({
    url: `/auth/users/set_username/`,
    method: 'POST',
    data,
  }),
  setPassword: (data: ISetPassword) => ({
    url: `/auth/users/set_password/`,
    method: 'POST',
    data,
  }),
});

export default getConfig();
