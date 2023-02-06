import { NextFunction, Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";

export class EmailValidatorMiddleware {
  public static emailValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.body;
      const database = new UserDatabase();
      const existingEmail = database.getOneEmail(email);

      if (existingEmail) {
        return RequestError.alreadyExisting(
          res,
          "There is already a use with this EMAIL"
        );
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
