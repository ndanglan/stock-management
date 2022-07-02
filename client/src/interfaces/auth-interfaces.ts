export interface IAuth {
  username?: string;
  password: string;
  email: string;
  confirmPassword?: string;
}

export interface IAuthAction {
  username: string;
  email: string;
  accessToken: string;
}
