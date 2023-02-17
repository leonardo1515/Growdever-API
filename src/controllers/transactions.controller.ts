import { Request, Response } from "express";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";
import { SuccessResponse } from "../util/success.response";
import { TransactionsDatabase } from "../database/trasactions.database";
import { Transacoes } from "../models/transactions.models";

export class TransactionsController {
  public add(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, value, type } = req.body;
      const database = new TransactionsDatabase();
      const user = database.getOneUser(userId);

      const newTransaction = new Transacoes(title, Number(value), type);
      user?.tansacoes?.push(newTransaction);

      const list = database.list(userId);
      const result = list?.map((transactions) => transactions.toJson());

      return SuccessResponse.created(
        res,
        "Transaction success created",
        result
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public getOne(req: Request, res: Response) {
    try {
      const { userId, transactionId } = req.params;
      const database = new TransactionsDatabase();
      const transaction = database.getOneTransaction(userId, transactionId);

      return SuccessResponse.ok(
        res,
        "Transaction successfully obtained",
        transaction
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public getAll(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const database = new TransactionsDatabase();
      const transactions = database.getAllTransactions(userId);
      const income = database.filterByType(userId, "income");
      const outcome = database.filterByType(userId, "outcome");

      const totalIncome = income?.reduce((curret, item) => {
        return (curret += item.value);
      }, 0);
      const totalOutcome = outcome?.reduce((curret, item) => {
        return (curret += item.value);
      }, 0);

      const balance = {
        income: totalIncome,
        outcome: outcome,
        total: totalIncome! - totalOutcome!,
      };

      return SuccessResponse.ok(res, "Transactions successfully obtained", [
        transactions,
        { balance: balance },
      ]);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { userId, idTransaction } = req.params;
      const { title, value, type } = req.body;
      const database = new TransactionsDatabase();
      const transaction = database.getOneTransaction(userId, idTransaction);

      if (title) {
        transaction!.title = title;
      }

      if (value) {
        transaction!.value = value;
      }

      if (type) {
        transaction!.type = type;
      }

      return SuccessResponse.created(
        res,
        "User successfully updated",
        transaction
      );
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { userId, idTransaction } = req.params;
      const database = new TransactionsDatabase();
      const user = database.getOneUser(userId);
      const transaction = database.getIndex(userId, idTransaction);

      database.delete(userId, transaction!);

      return SuccessResponse.ok(res, "Transaction successfully deleted", user);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
