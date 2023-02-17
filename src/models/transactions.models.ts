import { v4 as createUuid } from "uuid";

export class Transacoes {
  _idTransaction: string;
  constructor(
    private _title: string,
    private _value: number,
    private _type: "income" | "outcome"
  ) {
    this._idTransaction = createUuid();
  }

  public get title() {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get value() {
    return this._value;
  }

  public set value(value: number) {
    this._value = value;
  }

  public get type() {
    return this._type;
  }

  public set type(type: "income" | "outcome") {
    this._type = type;
  }

  public toJson() {
    return {
      id: this._idTransaction,
      title: this._title,
      type: this._type,
      value: this._value,
    };
  }
}
