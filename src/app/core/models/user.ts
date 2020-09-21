export class User {
  public id: string;
  public name: string;

  constructor(item: any) {
    if (item) {
      Object.assign(this, item);
    }
  }
}