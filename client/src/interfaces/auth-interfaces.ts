export interface IAuth {
  username?: string;
  password: string;
  email: string;
  confirmpassword?: string;
}

export interface IAuthAction {
  username: string;
  email: string;
  accessToken: string;
}
