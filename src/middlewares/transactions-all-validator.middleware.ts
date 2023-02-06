import { NextFunction, Request, Response } from "express";
import { TransactionsDatabase } from "../database/trasactions.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";

export class AllValidatorMiddleware {
  public static transactionAllValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;
      const database = new TransactionsDatabase();
      const user = database.getOneUser(userId);

      if (!userId) {
        return RequestError.fieldNotProvided(res, "User id");
      }

      if (!user) {
        return RequestError.notFound(res, "User");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
