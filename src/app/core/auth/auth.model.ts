export class LogInModel {
  public userName: string;
  public password: string;

  constructor(item: any = {}) {
    Object.assign(this, item);
  }
}

export class SignUpModel {
  public userName: string;
  public password: string;
  public confirmPassword: string;

  constructor(item: any = {}) {
    Object.assign(this, item);
  }
}
