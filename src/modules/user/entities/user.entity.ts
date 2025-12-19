export class User {
  private readonly _id: string;
  private readonly _username: string;
  private readonly _createAt: Date;
  private readonly _updateAt: Date;

  constructor(data: { id: string; username: string }) {
    this._id = data.id;
    this._username = data.username;
    this._createAt = new Date();
    this._updateAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get createAt(): Date {
    return this._createAt;
  }

  get updateAt(): Date {
    return this._updateAt;
  }
}
