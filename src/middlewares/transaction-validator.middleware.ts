import { NextFunction, Request, Response } from "express";
import { TransactionsDatabase } from "../database/trasactions.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";

export class TransactionsValidatorMiddleware {
  public static transactionValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;
      const { title, value, type } = req.body;
      const database = new TransactionsDatabase();
      const user = database.getOneUser(userId);

      if (!userId) {
        return RequestError.fieldNotProvided(res, "Id");
      }

      if (!user) {
        return RequestError.notFound(res, "User");
      }

      if (!title) {
        return RequestError.notFound(res, "Title");
      }
      if (!value) {
        return RequestError.notFound(res, "Value");
      }
      if (!type) {
        return RequestError.notFound(res, "Type");
      }

      if (String(type) !== "income" && String(type) !== "outcome") {
        return res.status(400).send({
          ok: false,
          message: `The ${type} type is not accepted, choose the "income" or "outcome" type`,
        });
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
