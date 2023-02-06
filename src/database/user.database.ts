import { User } from "../models/user.models";
import { users } from "./users";

export class UserDatabase {
  public list() {
    return [...users];
  }

  public getOneId(id: string) {
    return users.find((user) => user._idUser === id);
  }

  public getOneEmail(email: string) {
    return users.find((user) => user.email === email);
  }

  public getOneCpf(cpf: string) {
    return users.find((user) => user.cpf === cpf);
  }

  public getFilterName(name: string) {
    return users.filter((user) => user.name === name);
  }

  public getFilterCpf(cpf: string) {
    return users.filter((user) => user.cpf === cpf);
  }

  public getFilterEmail(email: string) {
    return users.filter((user) => user.email === email);
  }

  public getIndex(id: string) {
    return users.findIndex((index) => index._idUser === id);
  }

  public delete(index: number) {
    return users.splice(index, 1);
  }

  public create(newUser: User) {
    users.push(newUser);
  }
}
