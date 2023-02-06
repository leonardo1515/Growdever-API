import { users } from "./users";

export class TransactionsDatabase {
  public list(id: string) {
    const user = users.find((user) => user._idUser === id);
    return user?.tansacoes;
  }

  public getOneUser(id: string) {
    return users.find((user) => user._idUser === id);
  }

  public getOneTransaction(idUser: string, idTransaction: string) {
    const transaction = users.find((user) => user._idUser === idUser);
    return transaction?.tansacoes?.find(
      (transaction) => transaction._idTransaction === idTransaction
    );
  }

  public getAllTransactions(idUser: string) {
    const transaction = users.find((user) => user._idUser === idUser);
    return transaction?.tansacoes;
  }

  public filterByType(id: string, par: string) {
    const user = users.find((user) => user._idUser === id);
    const transaction = user?.tansacoes;
    return transaction?.filter((user) => user.type === par);
  }

  public getIndex(idUser: string, indexTransacton: string) {
    const transaction = users.find((user) => user._idUser === idUser);
    return transaction?.tansacoes?.findIndex(
      (transaction) => transaction._idTransaction === indexTransacton
    );
  }

  public delete(idUser: string, index: number) {
    const transaction = users.find((user) => user._idUser === idUser);
    return transaction?.tansacoes?.splice(index, 1);
  }
}
