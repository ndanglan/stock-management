export interface IAuthRegister {
  email: string;
  username: string;
  password: string;
  confirmpassword: string;
}

export interface IAuthLogin {
  email: string;
  password: string;
}
