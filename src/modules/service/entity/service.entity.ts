export class Service {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _price: number;
  private readonly _min: number;
  private readonly _max: number;
  private readonly _category: string;
  private readonly _type: string;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(data: {
    id: number;
    name: string;
    price: number;
    min: number;
    max: number;
    category: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this._id = data.id;
    this._name = data.name;
    this._price = data.price;
    this._min = data.min;
    this._max = data.max;
    this._category = data.category;
    this._type = data.type;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get min(): number {
    return this._min;
  }

  get max(): number {
    return this._max;
  }

  get category(): string {
    return this._category;
  }

  get type(): string {
    return this._type;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
