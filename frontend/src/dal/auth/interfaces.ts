import {
  IRegistrationConfirmData,
  IResetPasswordConfirmData,
  IResetPasswordData,
} from 'src/api/endpoints/auth';

export interface IUser {
  id: number;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  avatar?: IAvatar;
}

export interface IAvatar {
  source: string;
  preview: string;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  width: number;
  height: number;
  borderRadius: number;
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
