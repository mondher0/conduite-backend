export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data: T;
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
  name: string;
  email: string;
  password: string;
}

export interface RegisterResultDto {
  user: User;
}
