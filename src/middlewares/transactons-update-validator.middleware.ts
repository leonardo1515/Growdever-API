import { NextFunction, Request, Response } from "express";
import { TransactionsDatabase } from "../database/trasactions.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";

export class TransactionUpValidatorMiddleware {
  public static transactionUpdateValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId, idTransaction } = req.params;
      const database = new TransactionsDatabase();
      const user = database.getOneUser(userId);

      if (!userId) {
        return RequestError.fieldNotProvided(res, "User id");
      }

      if (!idTransaction) {
        return RequestError.fieldNotProvided(res, "Transaction id");
      }

      if (!user) {
        return RequestError.notFound(res, "User");
      }

      const transaction = database.getOneTransaction(userId, idTransaction);

      if (!transaction) {
        return RequestError.notFound(res, "Transaction");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
