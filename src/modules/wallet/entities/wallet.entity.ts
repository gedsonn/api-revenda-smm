export interface IHistoric {
  id: string;
  before: number;
  after: number;

  action: string;

  reference: string | null;
  walletId: string;

  createdAt: Date;
}

export interface IWallet {
  id: string;
  balance: number;
  locked: number;
  userId: string;
  history: IHistoric[];
  createdAt: Date;
  updatedAt: Date;
}

export class Wallet {
  private readonly _id: string;
  private readonly _balance: number;
  private readonly _locked: number;
  private readonly _userId: string;
  private readonly _history: IHistoric[] = [];
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(data: IWallet) {
    this._id = data.id;
    this._balance = data.balance;
    this._locked = data.locked;
    this._userId = data.userId;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;
  }
  get id(): string {
    return this._id;
  }
  get balance(): number {
    return this._balance;
  }
  get locked(): number {
    return this._locked;
  }
  get userId(): string {
    return this._userId;
  }
  get history(): IHistoric[] {
    return this._history;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
}
