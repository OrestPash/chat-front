
export class Message {
  public id: number;
  public text: string;
  public userId: string;
  public userName: string;
  public createdAt: Date;
  public updatedAt?: Date;
  public isDeleted: boolean;

  constructor(item: any = {}) {
    Object.assign(this, item);
    this.createdAt = item.createdAt ? new Date(item.createdAt) : undefined;
    this.updatedAt = item.updatedAt ? new Date(item.updatedAt) : undefined;
  }
}
