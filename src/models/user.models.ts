import { v4 as createUuid } from "uuid";
import { Transacoes } from "./transactions.models";

export class User {
  _idUser: string;
  private _tansacoes?: Transacoes[];

  constructor(
    private _name: string,
    private _age: number,
    private _cpf: string,
    private _email: string
  ) {
    this._idUser = createUuid();
    this._tansacoes = [];
  }

  public get cpf() {
    return this._cpf;
  }

  public set cpf(cpf: string) {
    this._cpf = cpf;
  }

  public get email() {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get age() {
    return this._age;
  }

  public set age(age: number) {
    this._age = age;
  }

  public get tansacoes() {
    return this._tansacoes;
  }

  public set tansacoes(tansacoes: Transacoes[] | undefined) {
    this._tansacoes = tansacoes;
  }

  public toJson() {
    return {
      id: this._idUser,
      nome: this._name,
      idade: this._age,
      email: this._email,
      cpf: this._cpf,
    };
  }
}
