import {
  ILoginData,
  IRegistrationConfirmData,
  IRegistrationData,
  IResetPasswordConfirmData,
  IResetPasswordData,
} from 'src/api/endpoints/auth';

export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
}

export interface ILoginActionData extends ILoginData {
  next?: string;
}
export interface IRegistrationActionData extends IRegistrationData {
  next?: string;
}
export interface IRegistrationConfirmActionData extends IRegistrationConfirmData {
  next?: string;
}
export interface IResetPasswordActionData extends IResetPasswordData {
  next?: string;
}
export interface IResetPasswordConfirmActionData extends IResetPasswordConfirmData {
  next?: string;
}
