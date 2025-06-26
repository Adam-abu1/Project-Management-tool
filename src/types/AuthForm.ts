export interface RegisterForm extends LoginForm {
  firstName: string;
  username: string;
  lastName: string;
  confirmPassword: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
