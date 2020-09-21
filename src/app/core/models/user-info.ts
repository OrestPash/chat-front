export class AuthIdentityClaims {
  // tslint:disable-next-line: variable-name
  public preferred_username: string;
  public sub: string;

  constructor(item: any) {
    if (item) {
      Object.assign(this, item);
    }
  }
}
