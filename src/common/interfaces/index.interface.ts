import { UserRoles } from "../enums";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: UserRoles;
}

export interface ServiceResponse<T = void> {
  success: boolean;
  message: string;
  data?: T;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResultDto {
  token: string;
  user: User;
}

export interface RegisterRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoles;
}

export interface RegisterResultDto {
  user: User;
}

export interface ContactUsRequestDto {
  email: string;
  message: string;
}

export interface ContactUs {
  id: string;
  email: string;
  message: string;
}
